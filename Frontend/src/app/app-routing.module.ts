import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PrivacyAndNotificationSettingsComponent } from './pages/settings-and-privacy/privacy-and-notification-settings/privacy-and-notification-settings.component';
import { SettingsAndPrivacyComponent } from './pages/settings-and-privacy/settings-and-privacy.component';
import { UpdatePersonalDataComponent } from './pages/settings-and-privacy/update-personal-data/update-personal-data.component';
import { UpdateSkillsAndInterestsComponent } from './pages/settings-and-privacy/update-skills-and-interests/update-skills-and-interests.component';
import { UpdateWorkAndEducationComponent } from './pages/settings-and-privacy/update-work-and-education/update-work-and-education.component';
import { AuthGuard } from './services/auth_guard/auth.guard';
import { RoleGuardAdmin} from './services/role_guard_admin/role.guard_admin'
import { RoleGuardUser } from './services/role_guard_user/role.guard_user';
import { ConfirmCodeComponent } from './pages/two-factor/confirm-code/confirm-code.component';
import { QrCodeComponent } from './pages/two-factor/qr-code/qr-code.component';
import { TwoFactorGuard } from './services/two_factor_guard/two_factor.guard'


const routes: Routes = [
  { path:'', component: HomepageComponent },
  { path:'settings-and-privacy', component: SettingsAndPrivacyComponent, canActivate: [AuthGuard, RoleGuardUser]},
          { path: 'settings-and-privacy/update-personal-data', component: UpdatePersonalDataComponent, canActivate: [AuthGuard]},
          { path: 'settings-and-privacy/update-skills-and-interests', component: UpdateSkillsAndInterestsComponent, canActivate: [AuthGuard]},
          { path: 'settings-and-privacy/update-work-and-education', component: UpdateWorkAndEducationComponent, canActivate: [AuthGuard, RoleGuardAdmin]},
          { path: 'settings-and-privacy/privacy-and-notification-settings', component: PrivacyAndNotificationSettingsComponent, canActivate: [AuthGuard]},
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'qrCode', component: QrCodeComponent, canActivate: [TwoFactorGuard]},
  { path: 'confirmCode', component: ConfirmCodeComponent, canActivate: [TwoFactorGuard]},
  { path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
