import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/services/login.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, 
    LoginComponent, 
    NavComponent, 
    RegisterComponent,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
