import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, ParamMap } from '@angular/router';
import { catchError, Observable, switchMap } from 'rxjs';
import { Cookie } from '../shared/cookie.model';
import { ForgotPasswordService } from './services/forgot-password.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  styleUrls: ['./forgot-password.component.sass']
})

export class ForgotPasswordComponent {
  cookie!: Cookie;
  resetPasswordForm!: FormGroup;
  validInfo: boolean = false;
  tokenExpired: boolean = false;
  token$!: string;

  @Input() token!: string;

  constructor(
    private router: Router,
    private passwordService: ForgotPasswordService, 
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ){
  }

  handleError(error: any){
    if(error.status == 401){
      const els = document.getElementsByClassName('d-none row row-cols-1 justify-content-center align-items-center px-2 my-1');
      for (let i = 0; i<els.length; i++){
        els[i].classList.add('d-block');
        els[i].classList.remove('d-none');
    }}
    return error.message;
  }

  onSubmit(){
    const token = localStorage.getItem('token') || this.token;
    this.cookie = new Cookie(token || "");
    if (token == null){
      const {email, fullName} = this.resetPasswordForm.value;
      this.passwordService.passwordResetRequest(email, fullName)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((res: any) => {
        if (res.status == 200 && res.body != null){
          this.cookie = res.body;
          localStorage.setItem('token', this.cookie.token);
          this.validInfo = true;
        }
      })
    }
    else{
      const password = this.resetPasswordForm.value.password;
      if (password == "" || password === null){
        return;
      }
      this.passwordService.passwordResetService(password).subscribe((res) => {
        if(res.status == 200 && res.body != null){
          localStorage.removeItem('token');
          localStorage.setItem('token', res.body.token);
          this.router.navigate(['']);
        }
      })
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    localStorage.removeItem('token');
    
    try{
      const {email, fullName} = this.passwordService.getDecodedAccessToken(this.token);
    
      if(email != null && fullName != null){
        localStorage.setItem('token', this.token);
        this.cookie = new Cookie(this.token);
      }
      
      this.resetPasswordForm = this.formBuilder.group({
        email: [email || '', Validators.compose([Validators.required, Validators.email])],
        fullName: [fullName || '', Validators.required],
        password: ['', Validators.required]
      });
    }
    catch(error){
      this.resetPasswordForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        fullName: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

}
