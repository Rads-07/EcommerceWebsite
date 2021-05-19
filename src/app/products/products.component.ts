import { CategoryService } from 'src/app/services/category.service';
import { switchMap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Category } from './../model/category.model';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products :Product[] = [];
  categories!:Category[];
  categoryId!:any; 
  categoryName!:string;
  filteredProducts !:Product[];
  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    private categoryService: CategoryService) { 
  }
  ngOnInit() {

    this.productService.getAll().subscribe(products =>{

      this.products=<Product[]>products;

      this.route.queryParamMap.subscribe(params =>{
          this.categoryName =params.get('category')|| '';
          if (this.categories){
            this.categoryId = (this.categories.find(item => item.categoryName === this.categoryName ))?.categoryId; 
            console.log(this.categoryId);
          }  
          if (this.products){
            this.filteredProducts = (this.categoryId, this.categoryName)
            ? this.products.filter(p => p.category.categoryId == this.categoryId) : this.products;
          }
          
        });

      });

      this.categoryService.getAll().subscribe((data:any) => {
          this.categories = data;
      });
      
  }


}
