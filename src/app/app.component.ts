import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  protected logueado = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authSvc: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    console.log('initializeApp');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authSvc.logueado
        .subscribe( logueado => {
          console.log('logueado', logueado);
          this.logueado = logueado;
          if ( logueado ) {
            this.router.navigate( ['home'] );
          } else {
            this.router.navigate( ['login'] );
          }
        });
    });
  }

  async cerrarSesion() {
    await this.authSvc.logout();
    this.menuCtrl.close();
  }
}
