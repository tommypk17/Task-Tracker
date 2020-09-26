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

    this.route.params.subscribe(x => {
      this.taskListId = x['id'];
      this.taskService.getTaskList(this.taskListId).subscribe((res: TasksService) => {
        this.taskListName = res.data.title;
        this.headerBlock.blockTitle = "Task Tracker - Task List - " + this.taskListName;
      });
    });

    //TODO: grab all the tasks for this list & add them to the array
    this.tasks.push({id: '1', taskListId:'1', title: 'Title here', subtitle: 'this is a subtitle', content: '', done: false, date:'2020/09/18'})
    this.tasks.push({id: '2', taskListId:'1', title: 'Title here2', subtitle: 'this is a subtitle2', content: '', done: false, date:'2020/09/18'})
    this.tasks.push({id: '3', taskListId:'1', title: 'Title here3', subtitle: 'this is a subtitle3', content: '', done: false, date:'2020/09/18'})
    this.tasks.push({id: '4', taskListId:'1', title: 'Title here4', subtitle: 'this is a subtitle4', content: '', done: true, date:'2020/09/18'})

  }

  markDone(id: string){
    const task = this.tasks.find(x => x.id == id);
    task.done = !task.done;
    //TODO: update db with done status
  }

  addTask(newTask: Task){
    //TODO: insert new task in db
     newTask.date = formatDate(newTask.date, 'y/MM/d', 'en-US', 'GMT');
    this.tasks.push(newTask);
  }

  deleteTask(id: string){
    //TODO: delete task from db
    const task = this.tasks.find(x => x.id == id);
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}
