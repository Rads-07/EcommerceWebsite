import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shopping-summary',
  templateUrl: './shopping-summary.component.html',
  styleUrls: ['./shopping-summary.component.css']
})
export class ShoppingSummaryComponent implements OnInit {

  @Input('cartProducts') cartProducts!:any[];
  @Input('items') items!:any[];
  constructor() { }
  ngOnInit(): void {
  }

  findItem(item:any){
    return this.cartProducts.find(p => p.productId=== item.id);
  }

  getPrice(item:any){
    return this.findItem(item).price*(item.quantity).toFixed(2);
  }

  totalPriceOfCartItems(){
    let sum:number = 0;
    for (let p of this.cartProducts)
      sum +=p.price;
    return sum.toFixed(2);
  }

}
