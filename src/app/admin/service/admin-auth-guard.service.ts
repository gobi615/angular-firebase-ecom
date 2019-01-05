import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth : AuthService, private router: Router) { }

  canActivate(route, state : RouterStateSnapshot){
    return this.auth.appUser$.pipe(map(appUser => {
      if(appUser.isAdmin)
        return true;
      return false;
    }));

  }
}
