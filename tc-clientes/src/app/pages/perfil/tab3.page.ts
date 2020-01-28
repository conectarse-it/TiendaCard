import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {}
  editar: boolean = false;
  loading;
  
  constructor(  private usuarioService: UsuarioService,
                private uiService: UiServiceService,
                private postsService: PostsService,
                private loadingController: LoadingController ) {}


  ngOnInit() {

    this.usuario = this.usuarioService.getUsuario();
    
  }

  async presentLoading( message: string) {
    this.loading = await this.loadingController.create({
      message,
      translucent: true,
      mode: 'ios',
      spinner: "bubbles"
    });
    return this.loading.present();

  }


  logout() {
    
    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
      
  }


  async actualizar( fActualizar: NgForm ) {
    
    this.presentLoading( 'Cargando... ' );


    if( fActualizar.invalid) {return;}

    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario );
  
    if ( actualizado) {
      // toast con mensaje actualizado
      this.uiService.presentToast('Usuario Actualizado OK !');
      this.editar = false;
         
    } else {
      // toast con error
      this.uiService.presentToast('Error al actualizar');

    }

    setTimeout( () => {
      this.loading.dismiss();
    },1000 );

  }



  btnEditar() {
    this.editar = true;
  }

  

}
