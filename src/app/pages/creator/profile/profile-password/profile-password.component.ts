import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/shared/validators/confirmed-validator';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit, OnDestroy {

  passwordsAccountFormData!: FormGroup;
  submitSub?: Subscription;

  constructor(
    readonly userService: UserService,
    readonly dialogRef: MatDialogRef<ProfilePasswordComponent>,
    readonly toastMessageService: ToastMessageService,
    private _formBuilder: FormBuilder,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
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
        currentPassword: ['', Validators.required]
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  ngOnDestroy(): void {
    this.submitSub?.unsubscribe();
  }

  get fPass() {
    return this.passwordsAccountFormData.controls;
  }

  submit(): void {
    const payload = { ...this.passwordsAccountFormData.value };
    this.submitSub = this.userService.changePassword(payload).subscribe(response => {
      this.toastMessageService.setMessage(
        this.translateService.instant('profile.notificationTitle'),
        response.body,
        toastMessageType.INFO,
        5
      );
    });
    this.dialogRef.close();
  }

}
