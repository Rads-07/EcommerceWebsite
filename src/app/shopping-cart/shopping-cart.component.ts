import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartProducts:any[]=[];
  items:any[]=[];
  price!:number;
  value:boolean=true;

  constructor(private shoppingCartService: ShoppingCartService) {
   }
  ngOnInit() {
    this.cartProducts = this.shoppingCartService.getCartProducts;
    this.items = this.shoppingCartService.getCartItems;
  }

  findItem(item:any){
     return this.cartProducts.find(p => p.productId=== item.id);
  }

  getCartItemName(item:any){
    return this.findItem(item).productName;
  }

  getImage(item:any){
    return this.findItem(item).image;
  }

  getPrice(item:any){
    this.price = this.findItem(item).price*(item.quantity);
    return this.price.toFixed(2);
  }

  totalPriceOfCartItems(){
    let sum:number = 0;
    for (let p of this.cartProducts)
      sum +=p.price;
    return sum.toFixed(2);
  }

  clearCart(){
    this.shoppingCartService.clearCart();
    this.value = false;
  }

  getCartProducts(products:any[]){
    this.cartProducts = products;
  }

  getItems(items:any[]){
    this.items = items;
  }


}
