import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {  

  appUser; 
  uCartId;
 
  constructor(private db : AngularFireDatabase, private userService: UserService, private authService: AuthService) { 
    console.log('service called');
  }

  async getCart(){
    let cartId = await this.getOrCreateCart();
    console.log(cartId);
    return this.getShopCart(cartId);
  }

  async getShopCart(cartId : string){
    let cart$ = this.db.object<any>('/shopping-cart/'+cartId).snapshotChanges();
    return cart$.pipe(map( cart => {
      if(cart == null){
        localStorage.removeItem("cartId");
        location.reload();                //reload the page
      }
      // console.log(cart.payload.val().items);
      let shopKart = new ShoppingCart(cart.payload.val().items,cart.payload.key);
      // localStorage.setItem('kart', JSON.stringify(shopKart));
      // console.log('shopping cart : '+JSON.stringify(shopKart));
     return shopKart; 
    }));
  }
  

  addToCart(product: Product){
    this.updateCart(product, 1);
  }

  async updateCart(product: Product, change: number){
    let cartId = await this.getOrCreateCart();
    // let q : number;
    let item$ = this.db.object<any>('/shopping-cart/'+cartId+'/items/'+product.key);    
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let quantity =  (item != null) ? item.quantity + change : (change < 0) ? 0 : change ;            
      if(quantity == 0) item$.remove();   
      else item$.update({
        title : product.title,
        price : product.price,       
        quantity : quantity, 
        imageUrl : product.url      
      });     
    });   
  }

  async getOrCreateCart(){

    // need to create logic like if he login his cart id is stored and get from db. If he is not logged in his anonyms cart is stored in local.
    let cartId = localStorage.getItem('cartId'); 
    console.log('cart: '+cartId);   
    if(!cartId){
      cartId =  this.getFromUser()
      // console.log(cartId);
      if(cartId){ //get cartId from fb in user object. 
        return cartId;
      }  
      
      let result = await this.createCart();
      console.log('cart null: '+result);
      localStorage.setItem('cartId',result.key);
      this.saveCartToUser(result.key);
      return result.key;
    }
    return cartId;   
  }
  saveCartToUser(cartId: any) {
    this.authService.user$.subscribe(user => {
      if(user){
        console.log('cart id is saving user');
        this.userService.save(user,cartId);
      }         
    });
  }
  
 getFromUser() : string { 
   let cartId : string;   
    this.authService.user$.subscribe(user => {
      this.appUser = this.userService.get(user.uid);
      this.appUser().subscribe((appuser)=>{
         cartId = appuser.cart;
        console.log(appuser.cart);
        console.log(appuser.name);
      });
         
    });
    
    return cartId;
  }

  createCart(){
    return this.db.list('/shopping-cart').push({
      dateCreated : new Date().getTime()
    });
  }

  removeFromCart(product: Product): any {
    this.updateCart(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();    
    this.db.object('/shopping-cart/' + cartId + '/items').remove();    
    localStorage.removeItem('cartId');
  }

  async mergeCart(){
    let localCart = localStorage.getItem('cartId');
    let dbCart =this. getFromUser();
    if(localCart != dbCart){
      console.log('executing 1');
      let shopCart = await this.getShopCart(dbCart);
      shopCart.subscribe((cart)=>{
        cart.items.forEach((item)=>{
          console.log('executing 2');
          this.updateCart({title : item.title, price : item.price, url : item.imageUrl, key : item.$key, category : ''}, item.quantity);
        });
      }) ;
      this.saveCartToUser(localCart);
    }
   
  }
    //merge

    //save local storage and db
    //reload to refelct
  

}
