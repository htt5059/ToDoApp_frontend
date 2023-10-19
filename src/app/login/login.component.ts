import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocialAuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

import { LoginService } from './services/login.service';
import { Cookie } from '../shared/cookie.model';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GoogleSigninButtonModule],
})
export class LoginComponent {
  cookie: Cookie = new Cookie("");
  loginForm!: FormGroup;
  socialUser!: SocialUser;

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService){}

  onSubmit(){
    this.loginService.login(this.loginForm.value).subscribe((res)=> {
      if(res.status == 200){
        this.loginForm.reset();
        this.loginService.user = {
          email: '',
          password: '',
          _id: '',
          fullName: '',
          socialMediaUserId: ''
        }
        this.setToken(res);
      }
    })
  }

  loginWithFacebook(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  setToken(res: HttpResponse<Cookie>){
    if(res.body!=null){
      this.cookie = res.body;
      localStorage.setItem('token', this.cookie.token);
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;

      if(!user)
        return;
      
      if(user.provider == 'FACEBOOK'){
        this.loginService.loginWithFacebook(this.socialUser).subscribe((res) => {
          this.setToken(res);
        });
      }

      if(user.provider == 'GOOGLE'){
        this.loginService.loginWithGoogle(this.socialUser).subscribe((res) => {
          this.setToken(res);
        });
      }
    })
  }
}
