import { Component } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  cargandoPost = false;

  loading: any;
  
  cargandoGeo = false;

  tempImages: string[] = [];

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }
  
  constructor(  private posts: PostsService,
                private route: Router,
                private geoLocation: Geolocation,
                private camera: Camera,
                private loadingController: LoadingController ) {}


  async crearPost() {
    
    // Llamo al componente cargando
    this.presentLoading( 'Publicando... ' );
    
    this.cargandoPost = true;
    const creado = await this.posts.crearpost( this.post);
    

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };


    this.tempImages = [];

    this.cargandoPost = false;

    setTimeout( () => {
      this.loading.dismiss();
    },1000 );

    this.route.navigateByUrl('main/tabs/tab1');



  }

  getGeo() {

    if ( !this.post.posicion ){
        this.post.coords = null;
        return;
    }

    this.cargandoGeo = true;

    this.geoLocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;

     }).catch((error) => {
        this.cargandoGeo = false;
     });
     
  }

  camara() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.procesarImagen( options );


  }

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.procesarImagen( options );
    
   
  }

  


  procesarImagen( options: CameraOptions ) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc( imageData );
       
      this.posts.subirImagen( imageData );
      this.tempImages.push( img );
 
 
     }, (err) => {
      // Handle error
     });
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

}
