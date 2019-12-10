import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { ShoppingCartService } from 'src/app/shared/service/shopping-cart.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

 @Output() sidenavToggle = new EventEmitter<void>();
 appUser: AppUser;
  
 @Input('cart') cart;

  constructor(private auth : AuthService, private cartService : ShoppingCartService) {     
  }

  ngOnInit() {   
    this.auth.appUser$
    .subscribe(appUser => {
     this.appUser = appUser;    
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout(){
    this.auth.logout();
  }

}
