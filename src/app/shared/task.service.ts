import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable()
export class TaskService {
  selectedTask: Task = new Task('', '', '', new Date(), new Date());
  tasks: Task[] = [];
  readonly baseUrl = `http://localhost:3000/task`
  constructor(private http: HttpClient) { }

  postTask(task: Task){
    return this.http.post(this.baseUrl, task)
  }

  getTasks(){
    return this.http.get(this.baseUrl)
  }

  updateTask(task: Task){
    return this.http.put(this.baseUrl+'/'+(task._id), task)
  }

  deleteTask(task: Task){
    return this.http.delete(this.baseUrl+'/'+task._id);
  }
}
