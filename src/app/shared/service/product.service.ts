import { Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private db : AngularFireDatabase) { }

  getAll():Observable<any>{
    return this.db.list('/product/').snapshotChanges()
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

}
