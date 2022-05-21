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

const routes: Routes = [
  { path:'', component: HomepageComponent },
  { path:'settings-and-privacy', component: SettingsAndPrivacyComponent, canActivate: [AuthGuard, RoleGuardAdmin, RoleGuardUser]},
          { path: 'settings-and-privacy/update-personal-data', component: UpdatePersonalDataComponent},
          { path: 'settings-and-privacy/update-skills-and-interests', component: UpdateSkillsAndInterestsComponent},
          { path: 'settings-and-privacy/update-work-and-education', component: UpdateWorkAndEducationComponent},
          { path: 'settings-and-privacy/privacy-and-notification-settings', component: PrivacyAndNotificationSettingsComponent},
  { path: 'feed', component: FeedComponent},
  { path: 'profile', component: ProfileComponent},
  { path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
