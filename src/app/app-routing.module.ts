import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/guards/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login', title: 'Login', component: LoginComponent},
  {path: 'register', title: 'Register', component: RegisterComponent},
  {path: '', title: 'Tasks', component: TaskComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
