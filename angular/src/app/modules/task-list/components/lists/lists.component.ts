import { Component, OnInit } from '@angular/core';
import {TaskList} from '../../../../shared/shared.module';
import {TasksService} from '../../../../services/tasks.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  headerBlock = {blockTitle: "Task Tracker - Lists", blockSubtitle: "", blockContent: "", blockBackLink: "", blockAddLink: 'taskList'};

  taskLists: TaskList[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getTaskLists().subscribe((res: TasksService) => {
      if(res.success){
        const lists = res.data;
        for(let list of lists){
          this.taskLists.push({id: list._id, title: list.title, subtitle: list.subtitle, content: list.content, link: '/task-list/'+list._id})
        }
      }
    }, err => {console.log(err)});
  }

  addTaskList(newTaskList: TaskList){
    this.tasksService.addTaskList(newTaskList).subscribe((res: AuthService) => {
      if(res.success){
        newTaskList.id = res.data._id;
        this.taskLists.push(newTaskList);
      }
    }, err => {console.log(err)});
  }

  deleteTaskList(id: string){
    const taskList = this.taskLists.find(x => x.id == id);
    this.tasksService.deleteTaskList(taskList).subscribe((res: AuthService) => {
      if(res.success){
        this.taskLists.splice(this.taskLists.indexOf(taskList), 1);
      }
    }, err => {console.log(err)});
  }

}
