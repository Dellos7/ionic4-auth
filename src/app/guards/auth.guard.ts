import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(  private authSvc: AuthService,
                private toastCtrl: ToastController) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const logueado = this.authSvc.estaLogueado();
    if ( !logueado ) {
      const toast = await this.toastCtrl.create({
        header: 'Error',
        message: 'No estás logueado',
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
    return Promise.resolve( logueado );
  }

}
