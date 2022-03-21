import { Subscription } from 'rxjs';
import { ICreator } from './../../../shared/interfaces/ICreator';
import { UserService } from './../../../shared/services/user.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientIsActive } from 'src/app/shared/constants/client-is-active';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  client?: ICreator;
  getClientDataSub?: Subscription;

  // form inputs
  usernameValue = '';
  emailValue = '';
  firstNameValue = '';
  lastNameValue = '';
  birthDateValue?: Date;
  minBirthDate = new Date(1920, 0, 1);
  maxBirthDate = new Date(2012, 0, 1);
  genderValue?: string;

  // enable edit mode
  mainEditModeEnabled = false;
  detailsEditModeEnabled = false;
  creatorSettingsEditModeEnabled = false;
  sessionsEditModeEnabled = false;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.getClientDataSub = this.userService.getUserWithRelations().subscribe(response => {
      this.client = response.body;
      this.loadDataIntoInputs();
      if(response.body && response.body.isActive === ClientIsActive.PROFILE_NOT_COMPLETE) {
        // stepper
        console.log('not complete');
      }
    });
  }

  loadDataIntoInputs(): void {
    if(!this.client) {
      return;
    }
    this.usernameValue = this.client.username;
    this.emailValue = this.client.email;
    this.firstNameValue = this.client.firstName;
    this.lastNameValue = this.client.lastName;

    // acc details
    this.birthDateValue = this.client.userDetails?.bithDate;
    this.genderValue = this.client.userDetails?.gender;
  }

  inputValueChanged(): void {
    
  }

  changeMainEditModeState(): void {
    this.mainEditModeEnabled = !this.mainEditModeEnabled;
  }

  changeDetailsEditModeState(): void {
    this.detailsEditModeEnabled = !this.detailsEditModeEnabled;
  }
  
  ngOnDestroy(): void {
    this.getClientDataSub?.unsubscribe();
  }

}
