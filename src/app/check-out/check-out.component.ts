import { Router } from '@angular/router';
import { Order } from './../model/order.model';
import { take } from 'rxjs/operators';
import { CheckoutService } from './../services/checkout.service';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { UserService } from './../services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  userId!:number;
  products:any[]=[];
  items:any[]=[];
  orderId!:number;

  constructor(
      private shoppingCartService: ShoppingCartService) {
      this.items = this.shoppingCartService.getCartItems;
      this.products = this.shoppingCartService.getCartProducts;
    }
  ngOnInit(): void {
   }

}
