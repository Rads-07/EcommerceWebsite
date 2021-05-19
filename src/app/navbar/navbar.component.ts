import { ShoppingCartService } from './../services/shopping-cart.service';
import { Router } from '@angular/router';
import { User } from './../model/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username!:any;
  isLoggedIn !:boolean;
  isCollapsed = true;
  cartProducts = [];

  constructor(
    public userService:UserService,   
    private router :Router,
    private shoppingCartService:ShoppingCartService)
    { 

        //console.log(this.userService.getAccessToken());
        this.isLoggedIn = this.userService.isLoggedIn;
        this.username = this.userService.getUsername();  
    }

  ngOnInit(): void {
  }

  getCartItemsCount(){
    this.cartProducts = this.shoppingCartService.getCartProducts;
    return this.cartProducts.length;
  }

  logout(){
    this.userService.logout();
    this.isLoggedIn = false;
    console.log('logout successfully');
    this.router.navigateByUrl('/');
  }

}
