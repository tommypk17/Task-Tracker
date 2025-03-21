import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public updatedRecentTaskLists = new Subject<boolean>();
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
    return this.http.get(environment.URL+'/tasklists',{headers: headers});
  }

  getTaskList(id): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.get(environment.URL + '/tasklists/'+id,{headers: headers});
  }

  addTaskList(tasklist): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(environment.URL + '/tasklists/create', tasklist, {headers: headers});
  }

  deleteTaskList(tasklist): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(environment.URL + '/tasklists/delete', tasklist, {headers: headers});
  }

  getTasklistsCount(): Observable<object>{
    return new Observable(subscriber => {
        let totalTaskLists = 0;
        let newRes = {message: 'tasks completed not found', success: false, data: {total: 0}}
        this.getTaskLists().subscribe((res: TasksService) => {
          if(res.success){
            const tasklists = res.data;
            for(let tasklist of tasklists){
              totalTaskLists += 1;
            }
            newRes.message = 'tasks completed found';
            newRes.success = true;
            newRes.data = {total: totalTaskLists};
            subscriber.next(newRes);
          }
        });
      }
    )
  }

  getRecentTaskLists(): Observable<object>{
    return new Observable(subscriber => {
      let recentTaskListsRes = {message:'no tasklists available', success: false, data: {}};
      this.authService.getProfile().subscribe((res: AuthService) => {
        if(res.success){
          const recentTaskListIds = res.data.settings.tasklists.recents;
          if(recentTaskListIds){
            this.getTaskLists().subscribe((res: TasksService) => {
              if(res.success){
                const tasklists = res.data;
                let recentTaskLists = [];
                for(let tasklistId of recentTaskListIds){
                  recentTaskLists.push(tasklists.find(x => x._id == tasklistId));
                }
                recentTaskListsRes.message = 'tasklists found';
                recentTaskListsRes.success = true;
                recentTaskListsRes.data = recentTaskLists;
                subscriber.next(recentTaskListsRes);
              }
            });
          }
        }
      });
      subscriber.next(recentTaskListsRes);
    })
  }

  updateRecentTaskLists(newListid: string): Observable<object>{
    //TODO: grab new list id, check array, if not exists, push & pop
    const updatedRecentTaskLists = {message:'unable to update recent tasklists', success: false, data:{_id:newListid}};
    return new Observable(subscriber => {
      this.getRecentTaskLists().subscribe((res: TasksService) => {
        if(res.success){
          const user: any = this.authService.retrieveUserData();
          let recentLists = user.settings.tasklists.recents;
          if(!recentLists.includes(newListid)){
            user.settings.tasklists.recents.pop();
            user.settings.tasklists.recents.unshift(newListid);
            this.authService.updateProfileSettings(user).subscribe((res: AuthService) => {
              if(res.success){
                updatedRecentTaskLists.message = 'recent tasklist updated';
                updatedRecentTaskLists.success = true;
                updatedRecentTaskLists.data = res.data;
                res.data.password = undefined;
                this.authService.storeUserData(this.authService.loadToken(), res.data);
                subscriber.next(updatedRecentTaskLists);

                //tell everyone (components) that the value was updated
                this.updatedRecentTaskLists.next(true);
              }
            });
          }else{
            updatedRecentTaskLists.message ='recent tasklists are up to date';
            subscriber.next(updatedRecentTaskLists);
          }
        }
      });
    });
  }

  getTasks(id = ''): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.get(environment.URL + '/tasks/'+id,{headers: headers});
  }

  updateTask(task): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(environment.URL + '/tasks/update/', task,{headers: headers});
  }

  deleteTask(task): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(environment.URL + '/tasks/delete', task, {headers: headers});
  }

  addTask(task): Observable<object>{
    let headers = new HttpHeaders();
    this.authService.loadToken();
    headers = headers.set('Authorization', this.authService.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(environment.URL + '/tasks/create', task, {headers: headers});
  }

  getTaskStatuses(): Observable<object>{
    return new Observable(subscriber => {
        let completedTasks = 0;
        let incompleteTasks = 0;
        let totalTasks = 0;
        let newRes = {message: 'tasks completed not found', success: false, data: {completed: 0, incomplete: 0, total: 0}}
        this.getTasks().subscribe((res: TasksService) => {
          if(res.success){
            const tasks = res.data;
            for(let task of tasks){
              completedTasks += task.complete == true ? 1 : 0;
              incompleteTasks += task.complete == false ? 1 : 0;
              totalTasks += 1;
            }
            newRes.message = 'tasks completed found';
            newRes.success = true;
            newRes.data = {completed: completedTasks, incomplete: incompleteTasks, total: totalTasks};
            subscriber.next(newRes);
          }
        });
      }
    )
  }


}
