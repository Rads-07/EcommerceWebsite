import { ProductService } from './../services/product.service';
import { Order } from './../model/order.model';
import { UserService } from './../services/user.service';
import { CheckoutService } from './../services/checkout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userId!:number;
  orders:any[]=[];
  cartProducts!:any[];
  view:boolean=false;
  constructor(
      private checkoutService:CheckoutService,
      private  userService:UserService,
      private productService :ProductService) {
       }

  async ngOnInit(){
      let orders:any[] = await this.myOrders();
      this.orders = orders;
  }
  
  getUserId(): Promise<any>{
    return this.userService.getId().toPromise();
  }

  async myOrders(): Promise<any>{
    let userId:number = await this.getUserId();
    return this.checkoutService.myOrders(userId).toPromise();
  }

  onView(items:any[]){
    
   /* let products:any =await this.productService.getAll().toPromise(); 
    this.cartProducts=[];
    this.view = true;

    for (let item of items){
      let p1 = products.find((p:any)=> p.productId == item.id);
      this.cartProducts.push(p1);
    }
    console.log(this.cartProducts);*/
   console.log(items);
  }
}
