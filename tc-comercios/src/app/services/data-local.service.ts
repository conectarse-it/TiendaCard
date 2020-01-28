import { Injectable, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Post, Comercio } from '../interfaces/interfaces';
import { UiServiceService } from './ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService  implements OnInit{

  posts: Post[] = [];
  comercioLocal: any = {};
  

  constructor(  private storage: Storage,
                private ui: UiServiceService ) { 

                  this.cargarFavoritos();
                }

  ngOnInit() {
   
  }


  guardarBeneficio( post: Post ) {

    let existe = false;
    let mensaje = '';



    for ( const e of this.posts ) {

      if (e['_id'] === post._id) { 
        existe = true;
        //console.log('Ya existe');
        break;
      }
    }

    if ( existe ) {
      this.posts = this.posts.filter( e => e._id !== post._id );
      mensaje = 'Removido de Favoritos;'

    } else {
      this.posts.push( post );
      mensaje = 'Agregada a Favoritos;'
    }

    this.storage.set('favoritos', this.posts );
    this.ui.presentToast( mensaje );
    
    return !existe;

    
    
  }


  async cargarFavoritos() {

    const posts = await this.storage.get('favoritos');
    this.posts = posts || [];

    return this.posts;
  }

  async existePost ( id: string ) {

    await this.cargarFavoritos();
    const existe = this.posts.find( post => post._id === id );

    return (existe)? true: false;

  }

  async traerUsuarioLocal( ) {

    
    if ( this.storage.get('comercio')  )  {
      
      this.comercioLocal = await this.storage.get('comercio');
      //this.ui.presentToast('Tarjeta cargada desde sus datos locales');
      return this.comercioLocal;
    } else {

      //console.log('usuario no existe');
      this.ui.presentToast('Sin datos locales para ver tarjeta... Necesita Internet !!!')
      
    }
    
    // this.usuarioLocal = this.storage.get('usuario');
    // return this.usuarioLocal

  }



}
