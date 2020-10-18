import {Component, Input, OnInit} from '@angular/core';
import {Task, TaskList} from 'src/app/shared/shared.module';
import {TasksService} from '../../../../services/tasks.service';
import {formatDate} from '@angular/common';

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
  public resp_grid_width = (window.innerWidth <= 540) ? this.min_cols : this.max_cols;
  public resp_col_2 = (window.innerWidth <= 540) ? 1 : 2;
  public resp_row_2 = (window.innerWidth <= 540) ? 1 : 2;


  constructor(private taskService: TasksService) { }

  ngOnInit(): void {

    this.taskService.getTasks().subscribe((res: TasksService) => {
      if(res.success){
        let tasks = res.data;
        let count = 0;
        for(let task of tasks){
          if(count < 6){
            if(!task.complete){
              task.date = task.date != undefined? formatDate(task.date, 'y/MM/dd', 'en-us') : task.date;
              this.upcomingTasks.push({id: task._id, tasklist: task.tasklist, title: task.title, subtitle: task.subtitle, content: task.content, done: task.complete, date: task.date})
            }
          }else{
            break;
          }
          count++;
        }

      }
    });

    this.taskService.getRecentTaskLists().subscribe((res: TasksService) => {
      if(res.success){
        const tasklists = res.data;
        let count = 0;
        for(let tasklist of tasklists){
          if(count < 3){
            this.recentTaskLists.push({id: tasklist._id, title: tasklist.title, subtitle: tasklist.subtitle, content: tasklist.content, link: '/task-list/'+tasklist._id});
          }else{
            break;
          }
          count++;
        }
      }
    });

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
