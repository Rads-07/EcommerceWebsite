import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../model/product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product!:any;
  @Input('show-actions') showActions = true;

  constructor(private shoppingCartService :ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  getQuantity(){
    return this.shoppingCartService.getQuantity(this.product);
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);
  }


}