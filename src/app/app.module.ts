import { CheckoutService } from './services/checkout.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap"
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { CustomFormsModule } from 'ng2-validation';
import { ProductService } from './services/product.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { DataTableModule } from 'angular7-data-table';
import { DataTablesModule } from 'angular-datatables';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { AdminAuthGaurdService } from './services/admin-auth-gaurd.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingSummaryComponent } from './shopping-summary/shopping-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    RegisterComponent,
    ProductFormComponent,
    ProductCardComponent,
    LoginComponent,
    ProductQuantityComponent,
    ShoppingSummaryComponent,
    ShippingFormComponent,
    ManageOrdersComponent
  ],
  imports: [
    BrowserModule,
    CustomFormsModule,
    NgbModule,
    DataTableModule,
    DataTablesModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([

      {path:'',component:ProductsComponent},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},

      {path:'check-out',component:CheckOutComponent, canActivate:[AuthGaurdService]},
      {path:'order-success/:id',component:OrderSuccessComponent,canActivate:[AuthGaurdService]},
      {path:'my-orders', component:MyOrdersComponent,canActivate:[AuthGaurdService]},

      {
        path:'admin/products',
        component:AdminProductsComponent, 
        canActivate:[AuthGaurdService,AdminAuthGaurdService]
      },

      {
        path:'admin/products/new',
        component:ProductFormComponent,
        canActivate:[AuthGaurdService, AdminAuthGaurdService]
      },

      {
        path:'admin/products/:id',
        component:ProductFormComponent,
        canActivate:[AuthGaurdService ,AdminAuthGaurdService]
      },

      {
        path:'admin/orders',
        component:AdminOrdersComponent,
        canActivate:[ AuthGaurdService,AdminAuthGaurdService]
      },
      
    ])
  ],
  providers: [
      UserService,
      CategoryService,
      ProductService,
      ShoppingCartService,
      CheckoutService,
      AuthGaurdService ,
      AdminAuthGaurdService,
      {
        provide:HTTP_INTERCEPTORS, 
        useClass:HttpInterceptorService , 
        multi:true

      }
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
