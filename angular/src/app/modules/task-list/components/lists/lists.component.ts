import { Component, OnInit } from '@angular/core';
import {TaskList} from '../../../../shared/shared.module';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  headerBlock = {blockTitle: "Task Tracker - Lists", blockSubtitle: "", blockContent: "", blockBackLink: "", blockAddLink: 'taskList'};

  taskLists: TaskList[] = [];

  constructor() { }

  ngOnInit(): void {
    //TODO: grab all the task lists from the db
    this.taskLists.push({id:'1',link:'/task-list/asd', title:'title 1', subtitle:'subtitle1', content:'content1'});
    this.taskLists.push({id:'2',link:'/task-list/asd', title:'title 2', subtitle:'subtitle2', content:'content2'});
    this.taskLists.push({id:'3',link:'/task-list/asd', title:'title 3', subtitle:'subtitle3', content:'content3'});
    this.taskLists.push({id:'4',link:'/task-list/asd', title:'title 4', subtitle:'subtitle4', content:'content4'});
    this.taskLists.push({id:'5',link:'/task-list/asd', title:'title 5', subtitle:'subtitle5', content:'content5'});

  }

  addTaskList(newTaskList: TaskList){
    //TODO: insert new task in db
    this.taskLists.push(newTaskList);
  }

  deleteTaskList(id: string){
    //TODO: delete tasklist from db
    const taskList = this.taskLists.find(x => x.id == id);
    this.taskLists.splice(this.taskLists.indexOf(taskList), 1);
  }

}
