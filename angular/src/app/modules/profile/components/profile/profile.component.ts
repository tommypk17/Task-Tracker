import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  headerBlock = {blockTitle: "Task Tracker - Profile", blockSubtitle: "", blockContent: ""};

  profile: Profile;

  constructor() {
  }

  ngOnInit(): void {
    //TODO: grab user profile info from db
    this.profile = new Profile("Tom", "K", "tomko", "tom@tom.com");
  }

  deleteAccount(){
    //TODO: delete account from db
  }

}

class Profile {
  public firstname: string;
  public lastname: string;
  public username: string;
  public email: string;

  constructor(firstname: string, lastname: string, username: string, email: string){
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
  }

}
