import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  serverErrorMessage!:string;
  showSuccessMessage!:boolean;

  constructor(private userService:UserService, private fb: FormBuilder, private router:Router,private route:ActivatedRoute,) { }

  form = this.fb.group({
    username: ['', [Validators.required, 
                    Validators.minLength(3),
                    ]], 
    password: ['']
  });

  get username(){
    return this.form.get('username');
  }

  ngOnInit(): void {
  }

  onSubmit(form:FormGroup) {
    this.userService.login(form.value.username, form.value.password ).subscribe((res:any)=>{

      this.showSuccessMessage=true;
      setTimeout(()=>{this.showSuccessMessage=false},4000);

      localStorage.setItem("username", form.value.username);
      localStorage.setItem('access_token',res.accessToken);
     
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')|| '/';
      localStorage.setItem('returnUrl', returnUrl);

      const decodeUserDetails = JSON.parse(window.atob(res.accessToken.split('.')[1]));
      console.log(decodeUserDetails);
      console.log(decodeUserDetails.scopes);

      localStorage.setItem('role',decodeUserDetails.scopes);

      if (this.userService.isLoggedIn)
      {
        console.log('in login component');
        this.router.navigateByUrl(returnUrl);
      }
   },
  err=>{
      this.serverErrorMessage="Incorrect Username OR Password";
  }
);
  }

}
