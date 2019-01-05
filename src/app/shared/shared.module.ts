import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ProductComponent } from './component/product/product.component';
import { MaterialModule } from '../material-module/material-module.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryService } from './service/category.service';
import { ProductService } from './service/product.service';
import { UserService } from './service/user.service';
import { RouterModule } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from './service/shopping-cart.service';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { PaymentComponent } from './component/payment/payment.component';
import { OrderSucessComponent } from './component/order-sucess/order-sucess.component';
import { OrderService } from './service/order.service';
import { CartSummaryComponent } from './component/cart-summary/cart-summary.component';
import { ProductSortingComponent } from './component/product-sorting/product-sorting.component';

@NgModule({
  declarations: [ProductComponent, CartComponent, CheckoutComponent, PaymentComponent, OrderSucessComponent, CartSummaryComponent, ProductSortingComponent],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild([
      {path:'allprd', component: ProductSortingComponent},
      {path:'cart', component: CartComponent},
      {path:'checkout', component: CheckoutComponent},
      {path:'orderpass', component: OrderSucessComponent}
    ])
  ],
  providers: [
    AuthService,
    CategoryService,
    ProductService,
    UserService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
