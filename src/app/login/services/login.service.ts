import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'src/app/shared/cookie.model';
import { User } from 'src/app/shared/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user!: User;
  token: string = localStorage.getItem('access_tokens') || '';
  // baseUrl = 'https://task-tracking-server-feabfeb69418.herokuapp.com/auth'
  private readonly baseUrl = environment.serverUrl+'/auth';
  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post<Cookie>(this.baseUrl+'/login', user, {observe: 'response'});
  }

  loginWithFacebook(socialUser: SocialUser){
   const user = new User('', socialUser.email, '', socialUser.name, socialUser.id);
   return this.http.post<Cookie>(this.baseUrl+'/login-with-facebook', user, {observe: 'response'});
  }

  loginWithGoogle(socialUser: SocialUser){
    const user = new User('', socialUser.email, '', socialUser.name, socialUser.id);
   return this.http.post<Cookie>(this.baseUrl+'/login-with-google', user, {observe: 'response'});
  }
}
