import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module/material-module.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { ProductComponent } from '../shared/component/product/product.component';
import { FooterComponent } from './component/footer/footer.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    ToolbarComponent,
    SidenavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild([
      {path: '' , redirectTo: '/allprd',  pathMatch: 'full'}
    ])
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    FooterComponent    
  ]
})
export class CoreModule { }
