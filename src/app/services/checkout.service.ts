import { ShoppingCartService } from './shopping-cart.service';
import { User } from './../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private http:HttpClient,
    private shoppingCartService:ShoppingCartService) {
     }
  
  placeOrder(order:any, items:any[], date:Date){
    console.log("in checkout service")
    console.log(order);
    let result = this.http.post(environment.apiBaseUrl+'/checkout',{'order':order, 'items':items, 'date':date});
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrder(){
    return this.http.get(environment.apiBaseUrl+'/orders').subscribe(o=> {console.log(o)}
    );
  }

  myOrders(userId:number){
    return this.http.get(environment.apiBaseUrl+'/myOrders/'+userId);
  }

}
