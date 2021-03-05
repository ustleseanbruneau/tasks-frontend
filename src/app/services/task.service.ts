import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

import { Task } from '../tasks/task.model'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<HttpResponse<Task[]>> {
    return this.http.get<Task[]>(
      'http://localhost:8080/api/tasks', { observe: 'response' }
    )
  }
}
