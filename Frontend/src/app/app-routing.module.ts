import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ConnectionsComponent } from './pages/connections/connections.component';
import { FeedComponent } from './pages/feed/feed.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { JobOffersComponent } from './pages/job-offers/job-offers.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsAndPrivacyComponent } from './pages/settings-and-privacy/settings-and-privacy.component';
import { UpdatePersonalDataComponent } from './pages/settings-and-privacy/update-personal-data/update-personal-data.component';
import { UpdateSkillsAndInterestsComponent } from './pages/settings-and-privacy/update-skills-and-interests/update-skills-and-interests.component';
import { UpdateWorkAndEducationComponent } from './pages/settings-and-privacy/update-work-and-education/update-work-and-education.component';
import { AuthGuard } from './services/auth_guard/auth.guard';
import { RoleGuardAdmin} from './services/role_guard_admin/role.guard_admin'
import { RoleGuardUser } from './services/role_guard_user/role.guard_user';

const routes: Routes = [
  { path:'', component: HomepageComponent },
  { path:'settings-and-privacy', component: SettingsAndPrivacyComponent, canActivate: [AuthGuard, RoleGuardUser]},
          { path: 'settings-and-privacy/update-personal-data', component: UpdatePersonalDataComponent, canActivate: [AuthGuard, RoleGuardUser]},
          { path: 'settings-and-privacy/update-skills-and-interests', component: UpdateSkillsAndInterestsComponent, canActivate: [AuthGuard, RoleGuardUser]},
          { path: 'settings-and-privacy/update-work-and-education', component: UpdateWorkAndEducationComponent, canActivate: [AuthGuard, RoleGuardUser]},
  { path: 'profile/:userId', component: ProfileComponent},
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard, RoleGuardUser]},
  { path: 'connections', component: ConnectionsComponent, canActivate: [AuthGuard, RoleGuardUser]},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard, RoleGuardUser]},
  { path: 'job-offers', component: JobOffersComponent, canActivate: [AuthGuard, RoleGuardUser]},
  { path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
