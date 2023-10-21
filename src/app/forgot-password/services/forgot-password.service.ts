import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cookie } from 'src/app/shared/cookie.model';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private readonly baseUrl = environment.serverUrl + '/auth';
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

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
