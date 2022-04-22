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
  
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { BottomRightVerticalNavbarComponent } from './shared-components/navbars-and-statusbars/bottom-right-vertical-navbar/bottom-right-vertical-navbar.component';



@NgModule({
  declarations: [
    AppComponent,
      HomepageComponent,
        LeftVerticalNavbarComponent,
        TopStatusBarComponent,
        TopLeftCornerLogoComponent,
        TopRightVerticalNavbarComponent,
      RegistrationPageComponent,
      SignInPageComponent,
      BottomRightVerticalNavbarComponent
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
