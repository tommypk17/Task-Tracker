import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  headerBlock = {blockTitle: "Task Tracker - Profile - Register", blockSubtitle: "", blockContent: ""};

  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  onRegister(){
    if(this.registerForm.status != 'VALID'){
      return false;
    }

    const user = this.registerForm.value;
    user.date_registered = Date();

    this.authService.registerUser(user).subscribe((data: AuthService) => {
      if(data.success){
        this.authService.authenticateUser(user).subscribe((data: AuthService) => {
          if(data.success){
            this.authService.storeUserData(data.token, data.user);
            this.router.navigate(['/']);
            return true;
          }
          return false
        }, err => {console.log(err)});
        return false;
      }
      return false
    }, err => {console.log(err)});

  }

}
