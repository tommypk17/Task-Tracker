import {Component, OnInit} from '@angular/core';
import {TaskList} from '../shared.module';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  recentTaskLists: TaskList[] = [];

  constructor() {}

  ngOnInit(): void {
    //TODO: grab recent task lists from db (3 max)
    this.recentTaskLists.push({id: '1', link: '/task-list/asd', title: 'title', subtitle: 'subtitle', content: 'content'})
    this.recentTaskLists.push({id: '1', link: '/task-list/asd', title: 'title', subtitle: 'subtitle', content: 'content'})
    this.recentTaskLists.push({id: '1', link: '/task-list/asd', title: 'title', subtitle: 'subtitle', content: 'content'})
  }

}

