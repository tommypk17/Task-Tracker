import { Component, OnInit } from '@angular/core';
import {Task, TaskList} from 'src/app/shared/shared.module';

@Component({
  selector: 'app-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss']
})
export class DashboardBlockComponent implements OnInit {

  private upcomingTasks: Task[] = [];
  private recentTaskLists: TaskList[] =[];
  private tasksComplete: number;
  private tasklistCount: number;
  private tasksIncomplete: number;

  //dynamically set grid width
  private min_cols = 1;
  private max_cols = 3;
  public resp_grid_width = (window.innerWidth <= 400) ? this.min_cols : this.max_cols;
  public resp_col_2 = (window.innerWidth <= 400) ? 1 : 2;
  public resp_row_2 = (window.innerWidth <= 400) ? 1 : 2;

  public userStats: object;

  constructor() { }

  ngOnInit(): void {
    //TODO: grab tasks by closest due date from db (6 max)
    this.upcomingTasks.push({id: "1", taskListId:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/01"});
    this.upcomingTasks.push({id: "2", taskListId:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/10"});
    this.upcomingTasks.push({id: "3", taskListId:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/13"});
    this.upcomingTasks.push({id: "4", taskListId:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/16"});
    this.upcomingTasks.push({id: "4", taskListId:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/22"});
    this.upcomingTasks.push({id: "4", taskListId:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/27"});

    //TODO: grab most recently used task lists from db (3 max)
    this.recentTaskLists.push({id:'1', title: 'title', subtitle: 'subtitle', content: 'content', link:'/task-list/asd'});
    this.recentTaskLists.push({id:'2', title: 'title2', subtitle: 'subtitle', content: 'content', link:'/task-list/asd'});
    this.recentTaskLists.push({id:'3', title: 'title3', subtitle: 'subtitle', content: 'content', link:'/task-list/asd'});

    //TODO: grab task stats
    this.tasksComplete = 0;
    this.tasklistCount = 0;
    this.tasksIncomplete = 0;

    this.userStats = {
      tasksComplete: this.tasksComplete,
      tasklistCount: this.tasklistCount,
      tasksIncomplete: this.tasksIncomplete,
      upcomingTasks: this.upcomingTasks,
      recentTaskLists: this.recentTaskLists,
    }
  }

  onResize(event) {
    this.resp_grid_width = (event.target.innerWidth <= 400) ? this.min_cols : this.max_cols;
    this.resp_col_2 = (window.innerWidth <= 400) ? 1 : 2;
    this.resp_row_2 = (window.innerWidth <= 400) ? 1 : 2;

  }

}
