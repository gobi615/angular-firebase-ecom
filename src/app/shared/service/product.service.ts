import { Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private db : AngularFireDatabase) { }

  getAll():Observable<any>{
    return this.db.list<Product>('/product/').snapshotChanges()
    .pipe( map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }

  save(product){
    this.db.list('/product/').push(product);
  }

  get(pid): Observable<any> {
    return this.db.object('/product/'+pid).snapshotChanges();
  }



  // getAll():Observable<Product>{
  //   return this.db.list<Product>('/product/').snapshotChanges()
  //   .pipe<Product>(map<AngularFireAction<DatabaseSnapshot<Product>>[],Product>(actions => 
  //       actions.map(a => ({ key: a.key, title: a.payload.val().title, price: a.payload.val().price, category: a.payload.val().category, url:a.payload.val().url }))
  //     )
  //   );
  // }

}
