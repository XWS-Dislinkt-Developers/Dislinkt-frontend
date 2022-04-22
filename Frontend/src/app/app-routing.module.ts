import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';

const routes: Routes = [
  {path:'', component: HomepageComponent },
  {path:'register', component: RegistrationPageComponent },
  {path:'sign-in', component: SignInPageComponent },
  {path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
