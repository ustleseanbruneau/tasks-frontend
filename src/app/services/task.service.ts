import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable, throwError, Subject } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'

import { Task } from '../tasks/task.model'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiURL = 'http://localhost:8080'
  private tasks: Task[] = []
  private tasksUpdated = new Subject<Task[]>()

  constructor(private http: HttpClient) { }

  /*
  getTasks(): Observable<HttpResponse<Task[]>> {
    return this.http.get<Task[]>(
      '/api/tasks', { observe: 'response' }
    )
  }
  getTasks(): Observable<Task> {
    return this.http.get<Task>(
      this.apiURL + '/api/tasks'
      //'/api/tasks'
      )
      .pipe(retry(1), catchError(this.handleError))
  }  
  */

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getTasks(): Observable<Task> {
    return this.http.get<Task>(
      this.apiURL + '/api/tasks'
      //'/api/tasks'
      )
      .pipe(retry(1), catchError(this.handleError))
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
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
