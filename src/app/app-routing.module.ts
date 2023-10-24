import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';


import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IntroComponent } from './intro/intro.component';

const routes: Routes = [
  {path: 'login', title: 'Login', component: LoginComponent},
  {path: 'register', title: 'Register', component: RegisterComponent},
  {path: 'forgot-password', title: 'Forgot Your Password', component: ForgotPasswordComponent},
  {path: 'forgot-password/:token', title: 'Forgot Your Password', component: ForgotPasswordComponent},
  {path: 'task', title: 'Tasks', component: TaskComponent, canActivate: [authGuard]},
  {path: '', title: 'Intro', component: IntroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
  ]
})
export class AppRoutingModule { }
