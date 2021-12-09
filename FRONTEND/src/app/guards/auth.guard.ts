import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';
import { MenuController, IonSlides } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public auth: AuthServiceService,private menuCtrl: MenuController) {}

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'start');
    // this.menuCtrl.enable(true, 'end');
  }
}
