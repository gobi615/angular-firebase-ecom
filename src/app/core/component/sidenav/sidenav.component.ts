import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() closeSideNav = new EventEmitter<void>();
  @Input('cart') cart;
  
  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.closeSideNav.emit();
  }

}
