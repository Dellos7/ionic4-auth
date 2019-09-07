import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const TOKEN_STORAGE_KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logueado = new BehaviorSubject(false);
  redirectUrl: string;

  constructor(  private platform: Platform,
                private storage: Storage ) {
    this.platform.ready()
      .then( () => {
        this.comprobarToken();
      });
  }

  private obtenerToken(): Promise<string> {
    return this.storage.get( TOKEN_STORAGE_KEY );
  }

  private guardarToken( token: string ) {
    this.storage.set( TOKEN_STORAGE_KEY, token );
  }

  private eliminarToken() {
    return this.storage.remove( TOKEN_STORAGE_KEY );
  }

  private async comprobarToken() {
    const token = await this.obtenerToken();
    if ( token ) {
      const tokenValido = this.comprobarTokenValido( token );
      this.logueado.next( tokenValido );
    } else {
      this.logueado.next( false );
    }
  }

  private comprobarTokenValido( token: string ): boolean {
    return true;
  }

  async loginToken(): Promise<boolean> {
    await this.comprobarToken();
    return Promise.resolve( this.logueado.value );
  }

  loginUsuarioPassword( usuario: string, password: string ): Promise<boolean> {
    // HACER LLAMADA A LA API PARA OBTENER EL TOKEN CON USUARIO Y PASSWORD
    let logueado = false;
    const resApi = 'n18g2e72e73gne1367'; // token
    if ( resApi ) {
      this.guardarToken( resApi );
      logueado = true;
    }
    this.logueado.next( logueado );
    return Promise.resolve( logueado );
  }

  logout(): Promise<any> {
    this.logueado.next( false );
    return this.eliminarToken();
  }

  estaLogueado(): boolean {
    return this.logueado.value;
  }

}
