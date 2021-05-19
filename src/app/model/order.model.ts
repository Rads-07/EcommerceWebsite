export class Order{
  
    constructor( public name:string, public user:any, 
      public city:string, public address:string, public totalPrice:number, public orderItems:any[] ){
    }
}