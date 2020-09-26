import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  headerBlock = {blockTitle: "Task Tracker - Dashboard", blockSubtitle: "", blockContent: ""};

  constructor() { }

  ngOnInit(): void {
  }

}
