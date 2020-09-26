import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public success: boolean;
  public message: string;
  public data: any;

  //TODO: fix to do updates on Tasks
  constructor(private http: HttpClient, private authService: AuthService) { }

  getTaskLists(): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/tasklists',{headers: headers});
  }

  getTaskList(id): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/tasklists/'+id,{headers: headers});
  }

  getTasks(id): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/tasks/'+id,{headers: headers});
  }

  updateTask(task): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/tasks/update/', task,{headers: headers});
  }

  deleteTask(task): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/tasks/delete', task, {headers: headers});
  }

  addTask(task): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/tasks/create', task, {headers: headers});
  }

  addTaskList(tasklist): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/tasklists/create', tasklist, {headers: headers});
  }

  deleteTaskList(tasklist): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/tasklists/delete', tasklist, {headers: headers});
  }


}
