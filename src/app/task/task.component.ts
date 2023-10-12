import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { NgForm } from '@angular/forms';
import {Toast} from 'bootstrap'
import { Task } from '../shared/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  
  taskService: TaskService;
  constructor(taskService: TaskService, private router: Router){
    this.taskService= taskService;
  }

  activateToastMessage(){
    console.log('Activated');
    const toast = document.getElementById('liveToastBtn')
    if(toast!=null){
      toast.addEventListener('click', () => {
        console.log('listening')
        var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        var toastList = toastElList.map(function(toastEl) {
            return new Toast(toastEl)
        })
        toastList.forEach(toast => toast.show())
      })
    }
  }
  onSubmit(form: NgForm){
    if(form.value._id=='' || form.value._id==null){
      this.taskService.postTask(form.value)
      .subscribe((res)=>{
          this.activateToastMessage();
          this.resetForm(form);
          this.getTasks();
      });
    }
    else{
      this.taskService.updateTask(form.value)
        .subscribe((res)=> {
          this.activateToastMessage();
          this.resetForm(form);
          this.getTasks();
        })
    }
  }

  resetForm(form?: NgForm){
    if(form)
      form.reset();

    this.taskService.selectedTask = {
      taskName: "",
      taskStatus: "",
      _id: "" 
    }
  }

  getTasks(){
    this.taskService.getTasks().subscribe((res) => {
      this.taskService.tasks = res as Task[];
    });
  }

  onEdit(task: Task){
    this.taskService.selectedTask=task;
  }

  onDelete(task: Task){
    console.log('deleting')
    this.taskService.deleteTask(task).subscribe((res) => {
      this.getTasks();
    })
  }

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTasks();
    this.resetForm();
  }
}
