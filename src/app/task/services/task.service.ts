import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../shared/task.model';
import { Cookie } from 'src/app/shared/cookie.model';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable()
export class TaskService {
  selectedTask!: Task;
  tasks: Task[] = [];
  // readonly baseUrl = 'https://task-tracking-server-feabfeb69418.herokuapp.com/task';
  readonly baseUrl: string = environment.serverUrl+'/task';
  constructor(private http: HttpClient) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  postTask(task: Task, cookie: Cookie){
    const token = this.getDecodedAccessToken(cookie.token)
    task.userId = token.id;
    return this.http.post(this.baseUrl, task)
  }

  getTasks(cookie: Cookie){
    const token = this.getDecodedAccessToken(cookie.token);
    return this.http.get(this.baseUrl+`/tasks/${token.id}`)
  }

  updateTask(task: Task){
    return this.http.put(this.baseUrl+'/'+(task._id), task)
  }

  deleteTask(task: Task){
    return this.http.delete(this.baseUrl+'/'+task._id);
  }
}
