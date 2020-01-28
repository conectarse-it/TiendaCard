import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PostsService } from '../../services/posts.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.url


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  favorito = false;
  corazon = 'heart-empty';

  
  slidesSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
  };
  
  @Input() post: Post = {};
  @Input( ) icono: boolean = false;



  constructor(  private http: HttpClient,
                private dataLocal: DataLocalService,
                private soscialSharing: SocialSharing,
                private postService: PostsService) { }

  ngOnInit() {
    this.favorito = this.icono;

    this.dataLocal.existePost( this.post._id ).then( existe => this.corazon = ( existe) ? 'heart': 'heart-empty'  );
    
  }


  favoritoManejo( ) {
    
    const guarda = this.dataLocal.guardarBeneficio( this.post );
    this.corazon = ( guarda ) ? 'heart': 'heart-empty'  ;


  }

  async compartir() {

    //const imagen = await this.postService.traerImagen( this.post.usuario._id, this.post.imgs[0] );
    
    let imagenComp;

    if ( this.post.imgs.length > 0 ){
      imagenComp = `${URL}/posts/imagen/${this.post.comercio._id}/${this.post.imgs[0]}` ;
    } else {
      imagenComp =''
    }

    
    
    this.soscialSharing.share(
      this.post.mensaje,
      this.post.comercio.razonSocial,
      imagenComp,
      'http://www.tiendacard.com'

    )
  }

}
