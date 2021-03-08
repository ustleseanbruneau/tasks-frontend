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
      '/api/tasks', { observe: 'response' }
    )
  }

  saveTask(task: Task, checked: boolean): Observable<Task> {
    task.completed = checked;
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(task);
    console.log(body);
    return this.http.post<Task>('/api/tasks/save', body, {'headers': headers});
  }

  addTask(task: Task): Observable<Task> {
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(task);
    console.log(body);
    return this.http.post<Task>('/api/tasks/save', body, {'headers': headers});
  }

  /*
  private handleError<T>(operation = 'operation', result?: T) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred.', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      `Something bad happened: please try again later.`);
  }
  */

}
