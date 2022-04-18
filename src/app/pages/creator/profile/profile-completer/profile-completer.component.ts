import { TranslateService } from '@ngx-translate/core';
import { ClientIsActive } from 'src/app/shared/constants/client-is-active';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from './../../../../shared/services/jwt.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { UserService } from 'src/app/shared/services/user.service';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';

@Component({
  selector: 'app-profile-completer',
  templateUrl: './profile-completer.component.html',
  styleUrls: ['./profile-completer.component.scss']
})
export class ProfileCompleterComponent implements OnInit, OnDestroy {

  completerForm!: FormGroup;
  updateSub?: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { firstName?: string, lastName?: string },
    readonly userService: UserService,
    readonly jwtService: JwtService,
    readonly dialogRef: MatDialogRef<ProfileCompleterComponent>,
    readonly toastMessageService: ToastMessageService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    if (this.authService.getAuthorizatedUser()?.isActive !== ClientIsActive.PROFILE_NOT_COMPLETE) {
      this.dialogRef.close();
    }
    this.completerForm = this._formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(16),
          ],
        ],
        firstName: [
          this.data.firstName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(28),
          ],
        ],
        lastName: [
          this.data.lastName,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(28),
          ],
        ]
      }
    );
  }

  ngOnDestroy(): void {
    this.updateSub?.unsubscribe();
  }

  get getForm() {
    return this.completerForm.controls;
  }

  submit(): void {
    const payload = { ...this.completerForm.value };
    this.updateSub = this.userService.updateProfile(payload).subscribe(response => {
      this.jwtService.setAccessToken(null);
      this.dialogRef.close();
      this.router.navigate(['/creator/profile']);
      this.toastMessageService.setMessage(
        this.translateService.instant('profile.notificationTitle'),
        response.body,
        toastMessageType.INFO,
        5
      );
    });
  }

}
