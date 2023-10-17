import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'src/app/shared/cookie.model';
import { User } from 'src/app/shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user!: User;
  token: string = localStorage.getItem('access_tokens') || '';
  // baseUrl = 'https://task-tracking-server-feabfeb69418.herokuapp.com/auth'
  baseUrl = 'http://localhost:3000/auth'
  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post<Cookie>(this.baseUrl+'/login', user, {observe: 'response'});
  }
}
