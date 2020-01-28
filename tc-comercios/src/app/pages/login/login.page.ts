import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Comercio } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  
  
  
  cargando: boolean = false;
  
  
  
  loginUser = {
    cuit: null,
    password: ''
  }

  registerUser: Comercio = {
    
    razonSocial: '',
    cuit: null,
    email: '',
    password: '',
    avatar: 'av-1.png'
    
  };

  
  constructor(  private usuarioService: UsuarioService,
                private navCtrl: NavController,
                private uiService: UiServiceService,
                private dataLocal: DataLocalService,
                ) { }

  ngOnInit() {

    this.slides.lockSwipes(true);
  }


  async login( fLogin: NgForm ) {

    this.cargando = true;
    if( fLogin.invalid ) { return; }

    const valido = await this.usuarioService.login( this.loginUser.cuit, this.loginUser.password );
    console.log(valido);



     if ( valido ){

        
         this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true} );



     }else {

       this.cargando = false;
       this.uiService.alertaInformativa('Cuit y Contraseña no son correctos...');



     }


    


  }

  async registro( fRegistro: NgForm ) {
    
    this.cargando = true;

    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro( this. registerUser );


    if ( valido ){

      this.cargando = true;
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true} );



  }else {

    this.cargando = false;
    this.uiService.alertaInformativa('Error al crear el Comercio...')


  }

  }

  


  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }


  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
