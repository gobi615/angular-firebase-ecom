import { Component } from '@angular/core';
import { UserService } from './shared/service/user.service';
import { AuthService } from './shared/service/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from './shared/service/shopping-cart.service';
import { map } from 'rxjs/operators';
import { ShoppingCart } from './shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cart$: Observable<ShoppingCart>;
  cartId: String;
  
  constructor(private userService: UserService, 
              private auth: AuthService, 
              private router: Router, 
              private cartService: ShoppingCartService){ }

async ngOnInit(){
  this.cart$ = await this.cartService.getCart();
  this.cartId = 'Hello';
  this.cart$.pipe(map<any,any>(cart => {
    this.cartId = cart.key
    console.log(this.cartId)
  })).subscribe(()=>{
    // this.auth.user$.subscribe(user => {
    //   if(!user)
    //     return;
    //   this.userService.save(user,this.cartId); 
    //   let returnUrl = localStorage.getItem('returnUrl');
    //   // console.log(returnUrl);console.log('app component');
    //   if (!returnUrl) 
    //     return; 
    //   localStorage.removeItem('returnUrl');
    //   this.router.navigateByUrl(returnUrl);     
    // })
  });
  // console.log(this.cartId);

}

}
