import { LangService } from './../../../shared/services/lang.service';
import { AuthService } from './../../../shared/services/auth.service';
import { AccountType } from './../../../shared/constants/account-type';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Countries } from 'src/app/shared/constants/countries';
import { Gender } from 'src/app/shared/constants/gender';
import { ConfirmedValidator } from '../../../shared/validators/confirmed-validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, AfterViewChecked {
  primaryAccountFormData!: FormGroup;
  passwordsAccountFormData!: FormGroup;
  detailsAccountFormData!: FormGroup;
  addressAccountFormData!: FormGroup;

  countries = Countries;

  minBirthDate = new Date(1920, 0, 1);
  maxBirthDate = new Date(2012, 0, 1);

  constructor(
    private _formBuilder: FormBuilder,
    readonly authService: AuthService,
    private readonly langService: LangService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
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
    this.passwordsAccountFormData = this._formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(32),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
    this.detailsAccountFormData = this._formBuilder.group({
      profileImg: [''],
      birthDate: [new Date(2000, 0, 1)],
      gender: [Gender.OTHER],
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

  // getters
  get fPrimary() {
    return this.primaryAccountFormData.controls;
  }
  get fPass() {
    return this.passwordsAccountFormData.controls;
  }
  get fDetails() {
    return this.detailsAccountFormData.controls;
  }
  get fAddress() {
    return this.addressAccountFormData.controls;
  }

  submit(): void {
    if (
      this.primaryAccountFormData.valid &&
      this.passwordsAccountFormData.valid &&
      this.detailsAccountFormData.valid &&
      this.addressAccountFormData.valid
    ) {
      const lang = this.langService.getLang();
      const newUser = {
        lang,
        accountType: AccountType.CREATOR,
        username: this.fPrimary['username'].value,
        firstName: this.fPrimary['firstName'].value,
        lastName: this.fPrimary['lastName'].value,
        email: this.fPrimary['email'].value,
        password: this.fPass['password'].value,
        profileImg: this.fDetails['profileImg'].value,
        birthDate: this.fDetails['birthDate'].value,
        gender: this.fDetails['gender'].value,
        country: this.fAddress['country'].value,
        city: this.fAddress['city'].value,
        zipCode: this.fAddress['zipCode'].value,
        address1: this.fAddress['address1'].value,
      };
      this.authService.register(newUser);
    }
  }
}
