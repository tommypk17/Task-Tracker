import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  //TODO: fix to do updates on Tasks
  constructor(private http: HttpClient, private authService: AuthService) { }

  savePage(projectId: string, documentId: string, page: any): Observable<object>{
    const regarding = {projectId, documentId};
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/pages/save', {regarding, page},{headers: headers});
  }
}
