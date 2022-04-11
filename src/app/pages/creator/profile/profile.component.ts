import { IRefreshToken } from './../../../shared/interfaces/IUser';
import { Subscription } from 'rxjs';
import { ICreator } from './../../../shared/interfaces/ICreator';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientIsActive } from 'src/app/shared/constants/client-is-active';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/shared/constants/gender';
import { Countries } from 'src/app/shared/constants/countries';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  client?: ICreator;
  getClientDataSub?: Subscription;

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
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getClientDataSub = this.userService
      .getUserWithRelations()
      .subscribe((response) => {
        this.client = response.body;
        this.refreshTokens = response.body.refreshTokens;
        this.loadDataIntoInputs();
        if (
          response.body &&
          response.body.isActive === ClientIsActive.PROFILE_NOT_COMPLETE
        ) {
          // stepper
          console.log('not complete');
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
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(28),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(28),
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

  ngOnDestroy(): void {
    this.getClientDataSub?.unsubscribe();
  }

  loadDataIntoInputs(): void {
    this.primaryAccountFormData!.setValue({
      username: this.client?.username,
      firstName: this.client?.firstName,
      lastName: this.client?.lastName,
      email: this.client?.email,
    });
    this.detailsAccountFormData!.setValue({
      profileImg: this.client?.userDetails?.profileImg,
      birthDate: this.client?.userDetails?.birthDate,
      gender: this.client?.userDetails?.gender,
      phoneNumber: this.client?.userDetails?.phoneNumber
        ? this.client?.userDetails?.phoneNumber
        : null,
    });
    this.addressAccountFormData!.setValue({
      country: this.client?.userDetails?.userAddress?.country,
      city: this.client?.userDetails?.userAddress?.city,
      zipCode: this.client?.userDetails?.userAddress?.zipCode,
      address1: this.client?.userDetails?.userAddress?.address1,
      address2: this.client?.userDetails?.userAddress?.address2,
    });
  }

  inputValueChanged(): void {}

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
}
