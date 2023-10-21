import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  user!: User;
  // baseUrl = 'https://task-tracking-server-feabfeb69418.herokuapp.com/auth'
  private readonly baseUrl = environment.serverUrl + '/auth';
  constructor(private http: HttpClient) { }

  register(user: User){
    console.log(user)
    const result = this.http.post(this.baseUrl+'/register', user, {observe: 'response'});
    try{
      return result;
    }
    catch(error){
      console.log('Error is at register')
      return result;
    }
  }
}
