import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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


  filterDone(task: Task) {
    return !task.done;
  }
  filterNotDone(task: Task) {
    return task.done;
  }

  private taskListId: string;
  private taskListName: string;

  constructor(private route: ActivatedRoute, private taskService: TasksService) { }

  ngOnInit(): void {

    //grab tasklist id
    this.route.params.subscribe(x => {
      this.taskListId = x['id'];
    });

    //fill out header
    this.taskService.getTaskList(this.taskListId).subscribe((res: TasksService) => {
      this.taskListName = res.data.title;
      this.headerBlock.blockTitle = "Task Tracker - Task List - " + this.taskListName;
    });

    //fill out tasks
    this.taskService.getTasks(this.taskListId).subscribe((res: TasksService) => {
      if(res.success){
        const tasks = res.data;
        for(let task of tasks){
          this.tasks.push({id: task._id, tasklist: task.tasklist, title: task.title, subtitle: task.subtitle, content: task.content, done: task.complete, date: task.lastUpdate})
        }
      }
    });
  }

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

  addTask(newTask: Task){
    newTask.tasklist = this.taskListId;
    this.taskService.addTask(newTask).subscribe((res: TasksService) => {
      if(res.success){
        newTask.date = formatDate(newTask.date, 'y/MM/d', 'en-US', 'GMT');
        this.tasks.push(newTask);
      }
    }, err => {console.log(err)});
  }

  deleteTask(id: string){
    const task = this.tasks.find(x => x.id == id);
    this.taskService.deleteTask(task).subscribe((res: TasksService) => {
      if(res.success){
        this.tasks.splice(this.tasks.indexOf(task), 1);
      }
    }, err => {console.log(err)});
  }
}
