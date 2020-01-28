import { Component, OnInit } from '@angular/core';
import { Comercio } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  comercio: Comercio = {}
  editar: boolean = false;
  
  constructor(  private usuarioService: UsuarioService,
                private uiService: UiServiceService,
                private postsService: PostsService ) {}


  ngOnInit() {

    this.comercio = this.usuarioService.getComercio();
    
  }


  logout() {
    
    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
    
    
  }


  async actualizar( fActualizar: NgForm ) {
    
    if( fActualizar.invalid) {return;}

    const actualizado = await this.usuarioService.actualizarComercio( this.comercio );
    

    if ( actualizado) {
      // toast con mensaje actualizado
      this.uiService.presentToast('Comercio Actualizado OK !');
      this.editar = false;
         


    } else {
      // toast con error
      this.uiService.presentToast('Error al actualizar');



    }

  }

  btnEditar() {
    this.editar = true;
  }

  

}
