import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        SignOutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
