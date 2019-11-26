import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-sorting',
  templateUrl: './product-sorting.component.html',
  styleUrls: ['./product-sorting.component.css']
})
export class ProductSortingComponent implements OnInit {
  sortId : String[] = ['price']
  products : Product[] = [];
  category;
  sort;
  filterdProduct : Product[] = []; 
  subscribtion: Subscription;

  constructor(private prodService : ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.subscribtion = this.route.queryParams.pipe(map(p => p.category)).subscribe(p => this.category = p);
    
   this.populateProduct(); 
  }

  populateProduct(){
    this.prodService.getAll().pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    }))
    .subscribe(params => {
      this.category = params.get('category');
      this.applyCategory();
      this.sort = params.get('sort');
      console.log(this.sort);
      this.applyFilter(this.sort);
    });

  }

  applyCategory(){
    this.filterdProduct = (this.category) ? this.products.filter(p => p.category === this.category) : this.products ; 
  }

  applyFilter(sort){
    if(sort){
      this.filterdProduct.sort((a,b) => {
        if(a.price == b.price)
          return 0;
        if(a.price > b.price)
          return 1; 
        
          return -1;
      });
    }else{
      this.filterdProduct.sort((a,b) => {
        if(a.key == b.key)
          return 0;
        if(a.key > b.key)
          return 1; 
        
          return -1;
      });
    }


   
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }

}
