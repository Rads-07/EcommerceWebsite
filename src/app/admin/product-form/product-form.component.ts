import { Category } from './../../model/category.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router'
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {

  ngOnInit(): void {}
  categories!: Category[];
  product:Product={
    productName:"",
    productDescription:"",
    price:0,
    stockAvailable:0,
    image:"",
    category:{
      categoryId:0}
  }
  id!: any;
  
  form = this.fb.group({
    productName: ['',Validators.required],
    productDescription: ['', Validators.required],
    category : this.fb.group({
          categoryId:['', Validators.required]
        }),
    price:['',Validators.required],
    stockAvailable:['', Validators.required],
    image:['']
  });



  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private router: Router, 
    private productService: ProductService, 
    private categoryService: CategoryService)

    {
      this.categoryService.getAll().subscribe((data:any) => {
          this.categories = data;
          console.log(this.categories);
      });
      
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(data=>
        {this.product =<Product>data, console.log(this.product)})
    }

  get title(){
    return this.form.get('productName');
  }
  get image(){
    return this.form.get('image');
  }
  get description(){
    return this.form.get('productDescription');
  }
  get price(){
    return this.form.get('price');
  }

  async save(product:any){
    console.log("in save method");
    console.log(this.id);
    console.log("product"+product);

    if (this.id) 
      await this.productService.update(this.id,<Product>product).toPromise();
   
    else 
      await this.productService.create(product).toPromise();
    
    this.router.navigateByUrl('/admin/products');

  }

  async delete(){
    if (!confirm('Are you sure you want to delete')) return ;
    await this.productService.delete(this.id).toPromise();
    this.router.navigateByUrl('/admin/products');
  }


  }
  
  
