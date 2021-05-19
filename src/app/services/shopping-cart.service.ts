import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  get getCartProducts(){
      let cartProducts = []
      if (localStorage.getItem('products'))
        cartProducts = JSON.parse(localStorage.getItem('products')|| '');
      return cartProducts;
  }

  get getCartItems(){
      let items=[]
      if(localStorage.getItem('items'))
        items = JSON.parse(localStorage.getItem('items')|| '');
      return items;
  }

  setCartProducts(cartProducts:any){
      localStorage.setItem('products',JSON.stringify(cartProducts) );
  }

  setCartItems(items:any){
      localStorage.setItem('items',JSON.stringify(items));
  } 

  addToCart(product: any){

      let cartProducts= this.getCartProducts
      let items= this.getCartItems;
      
      const i = items.find((item: any)=> item.id == product.productId);
      let item1 = i? i.quantity +=1 : items.push({"id":product.productId, "quantity":1})
      
      cartProducts.push(product);
      this.setCartItems(items);
      this.setCartProducts(cartProducts);   
  }

  getQuantity(product:any){
      let items = this.getCartItems;
      let item = items.find((p:any) => p.id == product.productId);
      return item?item.quantity : 0;
  }

  removeFromCart(product:any){
    let items = this.getCartItems;
    let products = this.getCartProducts;

    const i = items.find((item: any)=> item.id == product.productId);
    i.quantity -=1 ;

    items = items.filter((item:any )=> item.quantity>0);

    var index = products. findIndex((p:any)=> p.productId == product.productId);
    products.splice(index,1);

    this.setCartItems(items);
    this.setCartProducts(products);
  }

  clearCart() {
    localStorage.removeItem('products');
    localStorage.removeItem('items');
    //window.location.reload();
  }

}
