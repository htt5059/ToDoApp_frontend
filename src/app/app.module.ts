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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ForgotPasswordComponent,
    FormsModule,
    HttpClientModule, 
    LoginComponent, 
    NavComponent, 
    RegisterComponent,
  ],
  providers: [
    LoginService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('723613323145449')
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('77826641125-729trg3n8ndmo09vnv2v4unebo77prhd.apps.googleusercontent.com', {
              oneTapEnabled: false,
            })
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
