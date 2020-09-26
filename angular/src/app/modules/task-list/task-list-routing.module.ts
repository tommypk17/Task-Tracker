import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListsComponent} from './components/lists/lists.component';
import { TaskListComponent } from './components/task-list/task-list.component';

const routes: Routes = [{ path: '', component: ListsComponent },{ path: ':id', component: TaskListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskListRoutingModule { }
