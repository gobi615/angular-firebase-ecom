import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  items;
  cart$;
  userSubscription: Subscription;
  userId: string;
  
  constructor(private db : AngularFireDatabase, private cartService : ShoppingCartService, private authService: AuthService,private router:Router) {

   }

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();   
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    // this.router.navigate(['/']);
    location.reload();
    // setTimeout(function(){
    //   location.reload();
    // }, 1000);
   

    return 'Order Placed';
  }

  getOrders() { 
    return this.db.list('/orders');
  }

  // getOrdersByUser(userId: string) {
  //   return this.db.list('/orders', {
  //     query: {
  //       orderByChild: 'userId',
  //       equalTo: userId        
  //     }
  //   });
  // }
  
  ngOnDestroy() { 
    this.userSubscription.unsubscribe();
  }
}
