import {Component, Input, OnInit} from '@angular/core';
import {TaskList} from '../shared.module';
import {TasksService} from '../../services/tasks.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() isUserLoggedIn: boolean = false;
  @Input() recentTaskLists: TaskList[] = [];

  constructor(private route: ActivatedRoute, private taskService: TasksService, private authService: AuthService, private router: Router) {
    this.isUserLoggedIn = this.authService.loggedIn();
    this.updateRecentTaskLists();
  }

  ngOnInit(): void {
    this.taskService.updatedRecentTaskLists.subscribe((res) => {
      if(res){
        this.updateRecentTaskLists();
      }
    });

    this.router.events.subscribe((res) => {
      if(res instanceof NavigationEnd){
        this.updateToolbar();
      }
    });

  }


  updateRecentTaskLists():void{
    if(this.isUserLoggedIn){
      this.taskService.getRecentTaskLists().subscribe((res: TasksService) => {
        if(res.success){
          this.recentTaskLists = [];
          const tasklists = res.data;
          let count = 0;
          for(let tasklist of tasklists){
            if(count < 3){
              this.recentTaskLists.push({id: tasklist._id, title: tasklist.title, subtitle: tasklist.subtitle, content: tasklist.content, link: '/task-list/'+tasklist._id});
            }else{
              return;
            }
            count++;
          }
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/profile/login']);
  }

  updateToolbar(): void{
    this.authService.loggedInObserve().subscribe((res: AuthService) => {
      if(res){
        this.isUserLoggedIn = res.data.loggedIn;
      }
    });
  }
}

