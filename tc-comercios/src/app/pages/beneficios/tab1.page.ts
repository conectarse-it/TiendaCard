import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { LoadingController } from '@ionic/angular';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  loading: any;

  habilitado = true;

  constructor(  private postsServices: PostsService,
                private loadingController: LoadingController ) {



                  this.presentLoading( 'Cargando... ' );

                  
                }


  ngOnInit() {

    
    this.siguientes();

    this.postsServices.nuevoPost.subscribe( post => {
      this.posts.unshift( post );
    } );

    setTimeout( () => {
      this.loading.dismiss();
    },1000 );

    
  }

  ionViewWillEnter() {
    this.siguientes();

    this.postsServices.nuevoPost.subscribe( post => {
      this.posts.unshift( post );
    } )

    setTimeout( () => {
      this.loading.dismiss();
    },1000 );
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





  recargar( event) {
    this.presentLoading( 'Cargando... ' );  
    this.siguientes( event, true );
      this.habilitado = true;
      this.posts = [];
  }

  siguientes( event?, pull: boolean = false ) {
    
    this.postsServices.getPosts( pull )
        .subscribe( respuesta => {
          
          this.posts.push( ...respuesta.posts );
          //console.log( this.posts );


          if ( event ) {
            event.target.complete();

            if( respuesta.posts.length === 0 ){
              event.target.disabled = false;
            } 

          }
          
        });

        setTimeout( () => {
          this.loading.dismiss();
        },1000 );
  }

}
