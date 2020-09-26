import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import {SharedModule} from '../../shared/shared.module';
import { DashboardBlockComponent } from './components/dashboard-block/dashboard-block.component';

@NgModule({
  declarations: [HomeComponent, DashboardBlockComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
