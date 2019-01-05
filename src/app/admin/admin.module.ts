import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { AdminProductListComponent } from './component/admin-product-list/admin-product-list.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/service/auth-guard.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module/material-module.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProductFormComponent, AdminProductListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {
        path: 'products',
        component: AdminProductListComponent,
       
      },
      {
        path: 'products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'products/:id', 
        component: ProductFormComponent,
        canActivate: [AuthGuardService,AdminAuthGuardService]
      }    
    ])
  ]
})
export class AdminModule { }
