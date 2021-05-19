import { Product } from 'src/app/model/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  get(productId: string){
    return this.http.get(environment.apiBaseUrl+'/public/products/'+productId)
  }

  getAll(){
    return this.http.get(environment.apiBaseUrl+'/public/products');
  }

  create(product: Product){ 
    //console.log(data);
    return this.http.post(environment.apiBaseUrl+'/products',product);
  }

  update(productId:string, product:any){
    console.log(product);
    return this.http.put(environment.apiBaseUrl+'/products/'+productId,product);
  }

  delete(productId: string | null){
    return this.http.delete(environment.apiBaseUrl+'/products/'+productId);
  }

}
