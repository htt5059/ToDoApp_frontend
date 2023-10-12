import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';
import { Cookie } from '../shared/cookie.model';
import { json } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  styleUrls: ['./register.component.sass'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule] 
})
export class RegisterComponent {
  registerForm!: FormGroup;
  cookie: Cookie = new Cookie('');

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ){}

  onSubmit(){
    if (this.registerForm.value.email === '' || this.registerForm.value.fullName === '' || this.registerForm.value.password === ''){
      this.router.navigateByUrl('/register')
      return;
    }
    this.registerService.register(this.registerForm.value)
    .subscribe((res) => {
      if(res.status == 200){
        this.registerService.user = {
          email: '',
          password: '',
          _id: '',
          fullName: '',
        }
        
        localStorage.setItem('access_tokens', JSON.stringify(res));
        this.router.navigateByUrl('/')
      }
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }
}
