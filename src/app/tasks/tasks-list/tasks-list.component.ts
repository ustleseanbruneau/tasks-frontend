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
  }

  getDueDateLabel(task: Task) {
    return task.completed ? 'label-success' : 'label-primary'
  }

  onTaskChange(event, task) {
    //this.taskService.saveTask(task,event.target.checked).subscribe();
    console.log('task has changed')
  }

}
