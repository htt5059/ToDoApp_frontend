import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginService } from './services/login.service';
import { Cookie } from '../shared/cookie.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  cookie: Cookie = new Cookie('');
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService, 
    private router: Router, 
    private formBuilder: FormBuilder){
  }

  onSubmit(){
    this.loginService.login(this.loginForm.value).subscribe((res)=> {
      if(res.status == 200){
        this.loginForm.reset();
        this.loginService.user = {
          email: '',
          password: '',
          _id: '',
          fullName: '',
        }
        
        this.cookie.token = JSON.stringify(res.body);
        localStorage.setItem('access_tokens', this.cookie.token);
        this.router.navigateByUrl('/')
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })
  }
}
