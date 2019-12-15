import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable,of } from 'rxjs';
import {switchMap} from 'rxjs/operators'
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ : Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) { 
    this.user$ = this.afAuth.authState;     
  }

  async login(type){
    console.log(type);
    let user;
    if(type == 'gauth'){
      let provider = new firebase.auth.GoogleAuthProvider() ; 
      user = await this.afAuth.auth.signInWithPopup(provider);
    }
    else if(type == 'fauth'){             
      let provider = new firebase.auth.FacebookAuthProvider();
      user = await this.afAuth.auth.signInWithPopup(provider) ;
      
    }    
    return user;
   
  }

  logout(){
    this.afAuth.auth.signOut();   
  }

  get appUser$():Observable<AppUser>{
    return this.user$.pipe(switchMap(user => {
      if(user)
        return this.userService.get(user.uid).valueChanges();
      return of(null);
    }));
    
  }
}
