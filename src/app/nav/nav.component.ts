import { Component, SimpleChanges } from '@angular/core';
import { LoginService } from '../login/services/login.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class NavComponent {
  loginService: LoginService
  token: string = '';
  hasLogin: boolean = false;
  constructor(
    loginService: LoginService,
    private router: Router,
    private socialAuthService: SocialAuthService
    ){
    this.loginService = loginService;
  }

  getToken(){
    this.loginService.token = localStorage.getItem('token') || '';
    this.token = localStorage.getItem('token') || '';
    this.hasLogin = this.token===''? false: true;

  }
  
  async signOut(){
    await this.socialAuthService.signOut(true);
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'))
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.events.subscribe((val: any) => {
      if(val.url){
        this.getToken();
      }
    })
  }
}
