import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: { usuario: string, password: string } = {
    usuario: '123',
    password: '123'
  };

  constructor(  private authSvc: AuthService,
                private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async login() {
    const logueado = await this.authSvc.loginUsuarioPassword( this.usuario.usuario, this.usuario.password );
    if ( logueado ) {
      this.presentToast( 'Login correcto', 2000, 'success' );
    } else {
      this.presentToast( 'Login incorrecto', 2000, 'danger' );
    }
  }

  async loginToken() {
    const logueado = await this.authSvc.loginToken();
    if ( logueado ) {
      this.presentToast( 'Login correcto', 2000, 'success' );
    } else {
      this.presentToast( 'Login incorrecto', 2000, 'danger' );
    }
  }

  async presentToast( message: string, duration: number, color = 'dark' ) {
    (await this.toastCtrl.create({
      message,
      duration,
      color
    })).present();
  }

}
