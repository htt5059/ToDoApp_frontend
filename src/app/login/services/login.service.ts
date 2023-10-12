import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User = new User('', '', '', '');
  token: string = localStorage.getItem('access_tokens') || '';
  baseUrl = 'http://localhost:3000/auth'
  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post(this.baseUrl+'/login', user, {observe: 'response'});
  }
}
