import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { Comercio } from '../interfaces/interfaces';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';



const URL = environment.url;

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {

  token: string = null;  

  private comercio: Comercio;
  

  
  
  constructor(  private http: HttpClient,
                private storage: Storage,
                private navCtrl: NavController,
                private platform: Platform ) { }



  login( cuit: string, password: string ) {
    
    const data = { cuit, password };

    return new Promise( resolve => {

      this.http.post( `${ URL }/comercio/login`, data )
      .subscribe( async resp => {
        
        if ( resp['ok'] ) {
        
          await this.guardarToken( resp['token']);
          resolve(true);
        
        } else {
        
          this.token = null;
          this.storage.clear();
          resolve(false);

        }

      })

    })

  }  


  registro( comercio: Comercio ) {

    return new Promise( resolve => {

      this.http.post(`${URL}/comercio/create`, comercio )
          .subscribe( async resp => {
            console.log(resp);

            if ( resp['ok'] ) {
        
              await this.guardarToken( resp['token']);
              resolve(true);
            
            } else {
            
              this.token = null;
              this.storage.clear();
              resolve(false);
    
            }


          })



    } );

  }

  getComercio() {

    if ( !this.comercio._id) {
      this.validaToken();
    }


    return { ...this.comercio };

  }


  async guardarToken ( token: string ) {
    
    this.token = token;

    await this.storage.set('token', token);

    await this.validaToken();

  }




  async cargarToken() {

    this.token = await this.storage.get('token') || null;

  }




  async validaToken(): Promise<boolean> {


    await this.cargarToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      
      this.http.get( `${ URL }/comercio`, { headers} ).subscribe( resp => {

          if ( resp['ok']){
              this.comercio = resp['comercio'];
              this.storage.set('usuario', this.comercio);
              resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }



      });

    });

  }


  actualizarComercio( comercio: Comercio ) {

    const headers = new HttpHeaders({

      'x-token': this.token

    });

    return new Promise( resolve => {

      this.http.post( `${URL}/comercio/update`, comercio , { headers } )
      .subscribe( resp => {

        if(  resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        }else {
          resolve(false);
        }

      });
      
    })
    
    
  }



  async logout() {
    
    this.token = null;
    this.comercio = null;
    const limpio = await this.storage.remove('token');
    const limpioComercio = await this.storage.remove('comercio');
    window.location.reload();
    this.navCtrl.navigateRoot( '/login', { animated: true } );
    //this.router.navigateByUrl('login');

  }




}
