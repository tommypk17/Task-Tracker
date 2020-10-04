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
  loginAttempted: boolean = false;
  loginFailed: boolean = false;

  loginForm: FormGroup;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin(): void{
    this.loginAttempted = true;
    if(this.loginForm.status != 'VALID'){
      this.loginFailed = true;
      return;
    }

    const user = this.loginForm.value;

    this.authService.authenticateUser(user).subscribe((res: AuthService) => {
      if(res.success){
        this.authService.storeUserData(res.token, res.user);
        this.router.navigate(['/']);
        this.loginFailed = false;
        return
      }
      this.loginFailed = true;
      return
    }, err => {console.log(err)});

  }

}
