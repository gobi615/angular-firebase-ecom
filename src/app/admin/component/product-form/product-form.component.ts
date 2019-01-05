import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  count: number = 0;
  title;
  categories$;
  

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

  onSubmit(product: NgForm){
    console.log(product.value );
    this.productService.save(product.value);
  }

  removeOne(){
    if(this.count > 0)
      this.count--; 
  }
  


}
