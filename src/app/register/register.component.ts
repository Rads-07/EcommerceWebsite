import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showSuccessMessage!:boolean;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  serverErrorMessage!:string;
  constructor(public userService:UserService, private fb: FormBuilder) { }

  form = this.fb.group({
    username: ['', [Validators.required, 
                    Validators.minLength(3),
                    ]], 
    firstName: [''],
    lastName: [''],
    emailId: ['',[Validators.email]],
    dateOfBirth: [''],
    mobileNo: [''],
    password: ['']
  });

  get username(){
    return this.form.get('username');
  }

  onSubmit(form:FormGroup){
    this.userService.register(form.value).subscribe(
      res=>{ 
        console.log(res);
        this.showSuccessMessage=true
        setTimeout(()=>{this.showSuccessMessage=false},4000)
      },
      err=>{
        if(err.status===500)
        {
          this.serverErrorMessage="User is already registered";
          
        }
        else{
          this.serverErrorMessage=err;
        }
      }
      );

  }
  ngOnInit(): void {
  }

}
