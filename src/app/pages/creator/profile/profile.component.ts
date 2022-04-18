import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JwtService } from './../../../shared/services/jwt.service';
import { ProfileCompleterComponent } from './profile-completer/profile-completer.component';
import { ProfilePasswordComponent } from './profile-password/profile-password.component';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { Router } from '@angular/router';
import { IRefreshToken } from './../../../shared/interfaces/IUser';
import { Subscription } from 'rxjs';
import { ICreator } from './../../../shared/interfaces/ICreator';
import { UserService } from './../../../shared/services/user.service';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ClientIsActive } from 'src/app/shared/constants/client-is-active';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/shared/constants/gender';
import { Countries } from 'src/app/shared/constants/countries';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewChecked {
  client?: ICreator;
  getClientDataSub?: Subscription;
  updateSub?: Subscription;

  countries = Countries;
  refreshTokens?: IRefreshToken[];

  // form inputs
  birthDateValue?: Date;
  minBirthDate = new Date(1920, 0, 1);
  maxBirthDate = new Date(2012, 0, 1);
  genderValue?: string;

  primaryAccountFormData!: FormGroup;
  detailsAccountFormData!: FormGroup;
  addressAccountFormData!: FormGroup;

  constructor(
    private readonly userService: UserService,
    private _formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private toastMessageService: ToastMessageService,
    private dialog: MatDialog,
    private jwtService: JwtService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getClientDataSub = this.userService
      .getUserWithRelations()
      .subscribe((response) => {
        this.client = response.body;
        console.log(this.client);
        this.refreshTokens = response.body.refreshTokens;
        this.loadDataIntoInputs();
        if (
          response.body &&
          response.body.isActive === ClientIsActive.PROFILE_NOT_COMPLETE
        ) {
          // stepper
          this.dialog.open(ProfileCompleterComponent,
            {
              disableClose: true,
              data: {
                firstName: response.body.firstName,
                lastName: response.body.lastName
              }
            }
          );
        }
      });

    this.primaryAccountFormData = this._formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      email: ['', [Validators.required, Validators.maxLength(48)]],
    });

    this.detailsAccountFormData = this._formBuilder.group({
      profileImg: [''],
      birthDate: [new Date(2000, 0, 1)],
      gender: [Gender.OTHER],
      phoneNumber: [''],
    });

    this.addressAccountFormData = this._formBuilder.group({
      country: [''],
      city: [''],
      zipCode: [''],
      address1: [''],
      address2: [''],
    });
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.getClientDataSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }

  loadDataIntoInputs(): void {
    this.primaryAccountFormData!.patchValue({
      username: this.client?.username,
      email: this.client?.email,
    });
    this.detailsAccountFormData!.patchValue({
      profileImg: this.client?.userDetails?.profileImg,
      birthDate: this.client?.userDetails?.birthDate,
      gender: this.client?.userDetails?.gender,
      phoneNumber: this.client?.userDetails?.phoneNumber
        ? this.client?.userDetails?.phoneNumber
        : null,
    });
    this.addressAccountFormData!.patchValue({
      country: this.client?.userDetails?.userAddress?.country,
      city: this.client?.userDetails?.userAddress?.city,
      zipCode: this.client?.userDetails?.userAddress?.zipCode,
      address1: this.client?.userDetails?.userAddress?.address1,
      address2: this.client?.userDetails?.userAddress?.address2,
    });
  }

  inputValueChanged(): void { }

  // getters
  get fPrimary() {
    return this.primaryAccountFormData.controls;
  }
  get fDetails() {
    return this.detailsAccountFormData.controls;
  }
  get fAddress() {
    return this.addressAccountFormData.controls;
  }

  saveChanges(): void {
    const userDto = {
      username: this.client?.username,
      email: this.client?.email,
      gender: this.client?.userDetails?.gender,
      birthDate: this.client?.userDetails?.birthDate,
      phoneNumber: this.client?.userDetails?.phoneNumber,
      profileImg: this.client?.userDetails?.profileImg,
      country: this.client?.userDetails?.userAddress?.country,
      city: this.client?.userDetails?.userAddress?.city,
      zipCode: this.client?.userDetails?.userAddress?.zipCode,
      address1: this.client?.userDetails?.userAddress?.address1
    }
    const updateDto = {
      username: this.fPrimary['username'].value,
      email: this.fPrimary['email'].value,
      gender: this.fDetails['gender'].value,
      birthDate: this.fDetails['birthDate'].value,
      phoneNumber: this.fDetails['phoneNumber'].value,
      profileImg: this.fDetails['profileImg'].value,
      country: this.fAddress['country'].value,
      city: this.fAddress['city'].value,
      zipCode: this.fAddress['zipCode'].value,
      address1: this.fAddress['address1'].value
    }
    if (updateDto.username === userDto.username && updateDto.email === userDto.email && updateDto.gender === userDto.gender && updateDto.birthDate === userDto.birthDate && updateDto.phoneNumber === userDto.phoneNumber && updateDto.profileImg === userDto.profileImg && updateDto.country === userDto.country && updateDto.city === userDto.city && updateDto.zipCode === userDto.zipCode && updateDto.address1 === userDto.address1) {
      this.toastMessageService.setMessage(
        this.translateService.instant('profile.notificationTitle'),
        this.translateService.instant('profile.noChanges'),
        toastMessageType.WARN,
        5
      );
      return;
    }
    this.updateSub = this.userService.updateProfile(updateDto).subscribe(response => {
      this.router.navigate(['/creator/home']);
      this.jwtService.setAccessToken(null);
      this.toastMessageService.setMessage(
        this.translateService.instant('profile.notificationTitle'),
        response.body,
        toastMessageType.INFO,
        5
      );
    });
  }

  passwordChangeClick() {
    this.dialog.open(ProfilePasswordComponent);
  }
}
