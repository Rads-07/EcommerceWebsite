import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../model/order.model';
import { CheckoutService } from '../services/checkout.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  userId!:number;
  @Input('products') products:any[]=[];
  @Input('items') items:any[]=[];
  orderId!:number;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private userService: UserService,
      private checkoutService: CheckoutService) {

      this.userService.getId().pipe(take(1)).subscribe((id :any)=> {this.userId = parseInt(id)});
    }

  ngOnInit(): void {
   }

  form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]], 
        address: [''],
        city:['']
      });

  placeOrder(form:FormGroup){

    let price = this.totalPriceOfCartItems(this.products);

    let order = new Order(form.value.name,{"userId": this.userId},form.value.city,form.value.address ,price,this.items);   
  
    this.checkoutService.placeOrder(order, this.items, new Date()).pipe(take(1)).subscribe((id:any)=>{
        this.orderId = parseInt(id);
    });
    console.log("order placed");
    this.router.navigate(['/order-success',this.orderId]);
  }
  
  totalPriceOfCartItems(products:any[]):number{
    let sum:number = 0;
    for (let p of products){
        sum +=p.price;}
    return sum;
  }
}
