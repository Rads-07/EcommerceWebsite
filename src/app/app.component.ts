import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './model/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Organic-Shop';
  constructor(private userService:UserService){
    
  }
}

