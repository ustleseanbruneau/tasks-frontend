import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'
import { Task } from '../task.model'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    // this.tasks.push( new Task(1, "Task 1", true, "10/01/2020"));
    // this.tasks.push( new Task(2, "Task 2", true, "10/05/2020"));
    // this.tasks.push( new Task(3, "Task 3", true, "10/11/2020"));

    this.getTaskList();

    //this.taskService.onTaskAdded.subscribe(
    //  (task: Task) => this.tasks.push(task)
    //);
  }

  getTaskList() {
    return this.taskService.getTasks().subscribe(resp => {
      for (const data of resp.body) {
        this.tasks.push(data);
      }
      console.log('added tasks');
    })

  }

  getDueDateLabel(task: Task) {
    return task.completed ? 'label-success' : 'label-primary';
  }

  onTaskChange(event, task) {
    this.taskService.saveTask(task,event.target.checked).subscribe();
    //console.log("Task has changed");

  }

}
