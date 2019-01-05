import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  items;
  cart$;
  userSubscription: Subscription;
  userId: string;
  
  constructor(private db : AngularFireDatabase, private cartService : ShoppingCartService, private authService: AuthService,) {

   }

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();   
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
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
