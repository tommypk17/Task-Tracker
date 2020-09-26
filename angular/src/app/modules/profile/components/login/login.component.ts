import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  headerBlock = {blockTitle: "Task Tracker - Profile - Login", blockSubtitle: "", blockContent: ""};
  hidePassword: boolean = true;

  loginForm: FormGroup;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin(){
    if(this.loginForm.status != 'VALID'){
      return false;
    }

    const user = this.loginForm.value;

    this.authService.authenticateUser(user).subscribe((data: AuthService) => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/']);
        return true;
      }
      return false
    }, err => {console.log(err)});

  }

}
