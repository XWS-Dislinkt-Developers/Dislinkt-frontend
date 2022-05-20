import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent } from './pages/homepage/homepage.component';
  import { LeftVerticalNavbarComponent } from './shared-components/navbars-and-statusbars/left-vertical-navbar/left-vertical-navbar.component';
  import { TopStatusBarComponent } from './shared-components/navbars-and-statusbars/top-status-bar/top-status-bar.component';
  import { TopLeftCornerLogoComponent } from './shared-components/top-left-corner-logo/top-left-corner-logo.component';
  import { TopRightVerticalNavbarComponent } from './shared-components/navbars-and-statusbars/top-right-vertical-navbar/top-right-vertical-navbar.component';
  import { BottomRightVerticalNavbarComponent } from './shared-components/navbars-and-statusbars/bottom-right-vertical-navbar/bottom-right-vertical-navbar.component';
import { RegistrationModalComponent } from './shared-components/modals/registration-modal/registration-modal.component';
import { SignInModalComponent } from './shared-components/modals/sign-in-modal/sign-in-modal.component';
import { SignOutModalComponent } from './shared-components/modals/sign-out-modal/sign-out-modal.component';
import { SettingsAndPrivacyComponent } from './pages/settings-and-privacy/settings-and-privacy.component';
import { UpdatePersonalDataComponent } from './pages/settings-and-privacy/update-personal-data/update-personal-data.component';
import { UpdateWorkAndEducationComponent } from './pages/settings-and-privacy/update-work-and-education/update-work-and-education.component';
import { UpdateSkillsAndInterestsComponent } from './pages/settings-and-privacy/update-skills-and-interests/update-skills-and-interests.component';
import { PrivacyAndNotificationSettingsComponent } from './pages/settings-and-privacy/privacy-and-notification-settings/privacy-and-notification-settings.component';
import { ForgotPasswordComponent } from './shared-components/modals/forgot-password/forgot-password.component';
import { PasswordlessLoginComponent } from './shared-components/modals/passwordless-login/passwordless-login.component';



@NgModule({
  declarations: [
    AppComponent,
      HomepageComponent,
        LeftVerticalNavbarComponent,
        TopStatusBarComponent,
        TopLeftCornerLogoComponent,
        TopRightVerticalNavbarComponent,
        BottomRightVerticalNavbarComponent,
      RegistrationModalComponent,
      SignInModalComponent,
      SignOutModalComponent,
      SettingsAndPrivacyComponent,
      UpdatePersonalDataComponent,
      UpdateWorkAndEducationComponent,
      UpdateSkillsAndInterestsComponent,
      PrivacyAndNotificationSettingsComponent,
      ForgotPasswordComponent,
      PasswordlessLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
