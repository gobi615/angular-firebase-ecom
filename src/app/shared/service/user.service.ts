import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {  

  cartId;

  constructor(private db : AngularFireDatabase ) { }

  save(user: firebase.User, cartId ){
    console.log(cartId);
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email, 
      cart : cartId || 'nil'      
    });
  }

  get(uid: string): any {
    return this.db.object('/users/' + uid);
  }
}
