import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGaurdService implements CanActivate{

  constructor(private userService: UserService) { }
  canActivate(){
    if (this.userService.isAdmin)
      return true;
    return false;

  }

}
