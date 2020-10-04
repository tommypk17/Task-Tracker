import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from 'src/app/shared/shared.module';
import {formatDate} from '@angular/common';
import {TasksService} from '../../../../services/tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  headerBlock = {blockTitle: "Task Tracker - Task List", blockSubtitle: "", blockContent: "", blockBackLink: "/task-list", blockAddLink: 'task'};

  tasks: Task[] = [];

  filterDone(task: Task): boolean {
    return !task.done;
  }
  filterNotDone(task: Task): boolean {
    return task.done;
  }

  private taskListId: string;
  private taskListName: string;

  constructor(private route: ActivatedRoute, private taskService: TasksService, private router: Router) { }

  ngOnInit(): void {

    //grab tasklist id
    this.route.params.subscribe(x => {
      this.taskListId = x['id'];
      this.updateRecentTaskList(this.taskListId);
    });

    //fill out header
    this.taskService.getTaskList(this.taskListId).subscribe((res: TasksService) => {
      if(res.success){
        this.taskListName = res.data.title;
        this.headerBlock.blockTitle = "Task Tracker - Task List - " + this.taskListName;
      }else{
        this.headerBlock.blockTitle = "Task Tracker - Task List - Not Found!";
        this.headerBlock.blockAddLink = '';
      }
    });

    //fill out tasks
    this.taskService.getTasks(this.taskListId).subscribe((res: TasksService) => {
      if(res.success){
        const tasks = res.data;
        for(let task of tasks){
          task.date = task.date != undefined? formatDate(task.date, 'y/MM/dd', 'en-us') : task.date;
          this.tasks.push({id: task._id, tasklist: task.tasklist, title: task.title, subtitle: task.subtitle, content: task.content, done: task.complete, date: task.date})
        }
        this.route.fragment.subscribe(x => {
          if(x){
            this.flashTask(x);
          }
        });
      }
    });
  }

  //mark a task as done
  markDone(id: string){
    const task = this.tasks.find(x => x.id == id);
    task.done = !task.done;
    this.taskService.updateTask(task).subscribe((res: TasksService) => {
      //TODO: fix this to only update front-end if success, currently front-end is independent of success
      if(!res.success){
        task.done = !task.done;
      }
    }, err => {console.log(err)});
  }

  //add a task
  addTask(newTask: Task){
    newTask.tasklist = this.taskListId;
    this.taskService.addTask(newTask).subscribe((res: TasksService) => {
      if(res.success){
        newTask.id = res.data._id;
        newTask.date = formatDate(newTask.date, 'y/MM/d', 'en-US', 'GMT');
        this.tasks.push(newTask);
      }
    }, err => {console.log(err)});
  }

  //delete a task
  deleteTask(id: string){
    const task = this.tasks.find(x => x.id == id);
    this.taskService.deleteTask(task).subscribe((res: TasksService) => {
      if(res.success){
        this.tasks.splice(this.tasks.indexOf(task), 1);
      }
    }, err => {console.log(err)});
  }

  //flash the task when selected
  flashTask(id: string){
    const task = this.tasks.find(x => x.id == id);
  }

  //update the recent task lists
  updateRecentTaskList(id: string){
    this.taskService.updateRecentTaskLists(id).subscribe((res: TasksService) => {
    });
  }
}
