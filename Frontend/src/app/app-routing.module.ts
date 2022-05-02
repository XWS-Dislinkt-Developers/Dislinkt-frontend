import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PrivacyAndNotificationSettingsComponent } from './pages/settings-and-privacy/privacy-and-notification-settings/privacy-and-notification-settings.component';
import { SettingsAndPrivacyComponent } from './pages/settings-and-privacy/settings-and-privacy.component';
import { UpdatePersonalDataComponent } from './pages/settings-and-privacy/update-personal-data/update-personal-data.component';
import { UpdateSkillsAndInterestsComponent } from './pages/settings-and-privacy/update-skills-and-interests/update-skills-and-interests.component';
import { UpdateWorkAndEducationComponent } from './pages/settings-and-privacy/update-work-and-education/update-work-and-education.component';

const routes: Routes = [
  { path:'', component: HomepageComponent },
  { path:'settings-and-privacy', component: SettingsAndPrivacyComponent},
          { path: 'settings-and-privacy/update-personal-data', component: UpdatePersonalDataComponent},
          { path: 'settings-and-privacy/update-skills-and-interests', component: UpdateSkillsAndInterestsComponent},
          { path: 'settings-and-privacy/update-work-and-education', component: UpdateWorkAndEducationComponent},
          { path: 'settings-and-privacy/privacy-and-notification-settings', component: PrivacyAndNotificationSettingsComponent},
  { path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
