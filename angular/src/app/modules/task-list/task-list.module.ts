import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import {SharedModule} from '../../shared/shared.module';
import { ListsComponent } from './components/lists/lists.component';

@NgModule({
  declarations: [TaskListComponent, ListsComponent],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    SharedModule
  ]
})
export class TaskListModule { }
