import {Component, Input, OnInit} from '@angular/core';
import {Task, TaskList} from 'src/app/shared/shared.module';
import {TasksService} from '../../../../services/tasks.service';

@Component({
  selector: 'app-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss']
})
export class DashboardBlockComponent implements OnInit {

  public upcomingTasks: Task[] = [];
  public recentTaskLists: TaskList[] = [];
  public tasksComplete: number = 0;
  public tasksCount: number = 0;
  public taskListsCount: number = 0;
  public tasksIncomplete: number = 0;

  //dynamically set grid width
  private min_cols = 1;
  private max_cols = 3;
  public resp_grid_width = (window.innerWidth <= 400) ? this.min_cols : this.max_cols;
  public resp_col_2 = (window.innerWidth <= 400) ? 1 : 2;
  public resp_row_2 = (window.innerWidth <= 400) ? 1 : 2;


  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    //TODO: grab tasks by closest due date from db (6 max)

    this.upcomingTasks.push({id: "1", tasklist:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/01"});
    this.upcomingTasks.push({id: "2", tasklist:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/10"});
    this.upcomingTasks.push({id: "3", tasklist:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/13"});
    this.upcomingTasks.push({id: "4", tasklist:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/16"});
    this.upcomingTasks.push({id: "4", tasklist:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/22"});
    this.upcomingTasks.push({id: "4", tasklist:"1",title:"title", subtitle:"", content:"", done:false, date:"2020/09/27"});

    //TODO: grab most recently used task lists from db (3 max)
    this.recentTaskLists.push({id:'1', title: 'title', subtitle: 'subtitle', content: 'content', link:'/task-list/asd'});
    this.recentTaskLists.push({id:'2', title: 'title2', subtitle: 'subtitle', content: 'content', link:'/task-list/asd'});
    this.recentTaskLists.push({id:'3', title: 'title3', subtitle: 'subtitle', content: 'content', link:'/task-list/asd'});


    this.taskService.getTaskStatuses().subscribe((res: TasksService) => {
      if(res.success){
        this.tasksComplete = res.data.completed;
        this.tasksIncomplete = res.data.incomplete;
        this.tasksCount = res.data.total;
      }
    });

    this.taskService.getTasklistsCount().subscribe((res: TasksService) => {
      if(res.success){
        this.taskListsCount = res.data.total;
      }
    });

  }

  onResize(event) {
    this.resp_grid_width = (event.target.innerWidth <= 400) ? this.min_cols : this.max_cols;
    this.resp_col_2 = (window.innerWidth <= 400) ? 1 : 2;
    this.resp_row_2 = (window.innerWidth <= 400) ? 1 : 2;

  }

}
