import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular7-data-table';

import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {
  
  products!:Product[];
  tableResource!:DataTableResource<Product>;
  items:Product[]=[];
  itemCount!:number;
  
  constructor(private productService:ProductService) {
   }
   
  async ngOnInit() {
    let products:any[] =await  this.getProducts();
    this.products = products;
    this.initializeTable(this.products);
  }

  async getProducts(): Promise<any>{
      return this.productService.getAll().toPromise();
   }

   private initializeTable(products:Product[]){

        this.tableResource=new DataTableResource(products);
        this.tableResource.query({offset:0}).then(items => this.items=items);
        this.tableResource.count().then(count=>this.itemCount=count);
   }

   reloadItems(params:any){

        if(!this.tableResource) return;
          this.tableResource.query(params).then(items=>{
          this.items=items;
      });
   }

   filter(query:string){
      let filteredProducts=(query)
      ? this.products.filter(p=> (p.productName).toLowerCase().includes(query.toLowerCase()))
      : this.products;
      this.initializeTable(filteredProducts);  
   }


}
