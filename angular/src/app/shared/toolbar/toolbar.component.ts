import {Component, OnInit} from '@angular/core';
import {TaskList} from '../shared.module';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  recentTaskLists: TaskList[] = [];

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    //TODO: grab recent task lists from db (3 max)
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
  }

}

