import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns : String[] = ['title', 'price', 'quantity', 'total'] ;
  cart$; 
  cart = [] ; 
  datasource;
  temp = 'global';

  constructor(private cartService : ShoppingCartService) {
    this.init();    
   }

  ngOnInit() {   
  }

  async init(){
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe(item => {
      this.datasource = new MatTableDataSource(item.items);     
    });  
  }

}
