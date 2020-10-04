import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  headerBlock = {blockTitle: "Task Tracker - Profile", blockSubtitle: "", blockContent: ""};

  profile = new Profile();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((res: AuthService) => {
      this.profile = new Profile(res.data.firstname, res.data.lastname, res.data.username, res.data.email);
    });
  }

  deleteAccount(){
    this.authService.deleteAccount().subscribe((res: AuthService) => {
      console.log(res);
    });
  }

}

class Profile {
  public firstname: string;
  public lastname: string;
  public username: string;
  public email: string;

  constructor(firstname?: string, lastname?: string, username?: string, email?: string){
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
  }

}
