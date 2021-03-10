import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'
import { Task } from '../task.model'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  //tasks: Task[] = [];
  tasks: any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    // this.tasks.push( new Task("Task 1", true, "10/01/2020"));
    // this.tasks.push( new Task("Task 2", true, "10/05/2020"));
    // this.tasks.push( new Task("Task 3", true, "10/11/2020"));

    console.log('initializer method');
    this.getTaskList();

    /*
    this.taskService.getTasks().subscribe(
      (task: Task) => this.tasks.push(task)
    );
    */
  }

  getTaskList() {

    console.log('getTaskList method');

    return this.taskService.getTasks().subscribe((data: {}) => {
      this.tasks = data;
    })

    /*
    return this.taskService.getTasks().subscribe(
      (task: Task) => this.tasks.push(task)
    )
    */

    /*
    return this.taskService.getTasks().subscribe(task => {
      this.tasks.push(task);
      console.log('added tasks');
    })
    */
    
  }

  getDueDateLabel(task: Task) {
    return task.completed ? 'label-success' : 'label-primary';
  }

  onTaskChange(event, task) {
    this.taskService.saveTask(task,event.target.checked).subscribe();
    //console.log("Task has changed");

  }

}
