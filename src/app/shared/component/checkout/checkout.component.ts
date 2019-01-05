import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Order } from '../../models/order';
import { ShoppingCart } from '../../models/shopping-cart';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart$ : Observable<ShoppingCart>;
  userSubscription: Subscription;
  
  constructor(private cartService : ShoppingCartService) { }

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();       
  }
}
