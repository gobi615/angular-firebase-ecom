import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  @Input('cart') cart: ShoppingCart; 
  userSubscription: any;
  userId: string;

  constructor( 
              private router : Router, 
              private orderService : OrderService,
              private authService : AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  placeOrder(shipping){
    console.log(shipping);
    console.log(this.cart);  
    let order = new Order(this.userId, shipping, this.cart);
    let result = this.orderService.placeOrder(order);
    this.router.navigate(['/orderpass', result]);
    
  }

}
