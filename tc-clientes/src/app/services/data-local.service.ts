import { Injectable, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Post, Usuario } from '../interfaces/interfaces';
import { UiServiceService } from './ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService  implements OnInit{

  posts: Post[] = [];
  usuarioLocal: any = {};
  

  constructor(  private storage: Storage,
                private ui: UiServiceService ) { 
                
                  this.cargarFavoritos();
                }

  ngOnInit() {
   
  }


  async guardarBeneficio( post: Post ) {

    let existe = false;
    let mensaje = '';

    const usu = await this.traerUsuarioLocal();
    

    
    for ( const e of this.posts ) {

      if (e['_id'] === post._id) { 
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.posts = this.posts.filter( e => e._id !== post._id );
      mensaje = 'Removido de Favoritos'

    } else {
      this.posts.push( post );
      mensaje = 'Agregada a Favoritos'
    }

    this.storage.set(`favoritos-${usu._id}`, this.posts );
    this.ui.presentToast( mensaje );
    
    return !existe;

    
    
  }


  async cargarFavoritos() {

    const usu = await this.traerUsuarioLocal();
    const posts = await this.storage.get(`favoritos-${usu._id}`);
    this.posts = posts || [];

    return this.posts;
  }

  async existePost ( id: string ) {

    await this.cargarFavoritos();
    const existe = this.posts.find( post => post._id === id );

    return (existe)? true: false;

  }

  async traerUsuarioLocal( ) {

    
    if ( this.storage.get('usuario')  )  {
      
      this.usuarioLocal = await this.storage.get('usuario');
      return this.usuarioLocal;

    } 
    

  }



}
