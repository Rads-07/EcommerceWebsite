import { Component, Input, OnInit} from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') product!:any;

  @Output('items') getItems = new EventEmitter<any[]>();
  @Output('cartProducts') getProducts = new EventEmitter<any[]>();

  constructor(private shoppingCartService :ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
    this.eventEmitters();
  }

  getQuantity(){
    return this.shoppingCartService.getQuantity(this.product);
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);
    this.eventEmitters();
  }

  eventEmitters(){
    this.getProducts.emit(this.shoppingCartService.getCartProducts);
    this.getItems.emit(this.shoppingCartService.getCartItems);
  }


}
