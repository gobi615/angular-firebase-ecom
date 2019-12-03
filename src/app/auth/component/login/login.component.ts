import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router : Router) { 

  }

  ngOnInit() {
  }

  login(type){
    this.auth.login(type);
    this.auth.appUser$.subscribe(user => {
      if(user)
        this.router.navigateByUrl('/allprd');
    }) ;
    
  }

}
