import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';


@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor( private lis:LoginService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let auxbol=false;
      if(this.lis.loggedUser.perfil=='administrador'){
        auxbol=true;
      }
    return auxbol;
  }
  
}
