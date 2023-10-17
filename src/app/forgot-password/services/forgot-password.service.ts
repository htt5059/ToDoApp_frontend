import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'src/app/shared/cookie.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private readonly baseUrl = "http://localhost:3000/auth"
  constructor(private http: HttpClient) { }

  passwordResetRequest(email: string, fullName: string){
    return this.http.post<Cookie>(this.baseUrl+`/passwordResetRequest`, {
      email: email,
      fullName: fullName
    }, {observe: 'response'})
  }

  passwordResetService(password: string){
    return this.http.post<any>(this.baseUrl+`/passwordResetService`, {
      token: localStorage.getItem('token'),
      password: password
    }, {observe: 'response'})
  }
}
