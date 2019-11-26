import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { take } from 'rxjs/operators';
import { Product } from '../../models/product';
import { pipe, Observable } from 'rxjs';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input('products') products;
  count =0;
 
  public innerWidth: any;
  public prdCol;
  cart$ : Observable<ShoppingCart>;
  // let kart : Map<number, Product[]> = new Map<number, Product[]>();

  constructor(private cartService:ShoppingCartService) {
           this.initCart();
   }

 ngOnInit() {      
    this.innerWidth = window.innerWidth;  
    this.getprdCol();
  }

  async initCart(){
    this.cart$ = await this.cartService.getCart();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.getprdCol();
  }

  getprdCol(){
    if(this.innerWidth < 599 )
      this.prdCol = 1;
    else if(this.innerWidth < 959 )
      this.prdCol = 2;
    else if(this.innerWidth < 1279 )
      this.prdCol = 3;
    else if(this.innerWidth < 1919 )
      this.prdCol = 4;
    else if(this.innerWidth < 5000 )
      this.prdCol = 5;
  }

  getAllProduct(){
    //this.product = this.prodService.getAll();
  }
  addOne(product: Product){
    this.cartService.addToCart(product);
  }
  removeOne(product: Product){
    this.cartService.removeFromCart(product);
  }
  
}
