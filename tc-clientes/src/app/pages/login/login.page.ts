import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, ModalController, IonList } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';
import { TarjetaLocalPage } from '../tarjeta-local/tarjeta-local.page';
import { LoadingController } from '@ionic/angular';
import { ComerciosService } from '../../services/comercios.service';


import { Plugins, NetworkStatus, PluginListenerHandle } from "@capacitor/core";


const { Network } = Plugins;



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  @ViewChild( IonList, { read: ElementRef, static: true}) list: ElementRef;
  
  
  
  cargando: boolean = false;

  btnAtras: boolean = false;

  loading;

  paginaLogin: boolean = true;
  
  
  loginUser = {
    dni: null,
    password: ''
  }

  repitePass;

  registerUser: Usuario = {
    
    nombre: '',
    apellido: '',
    dni: null,
    email: '',
    password: '',
    avatar: 'av-1.png',
    comercio:''
    
  };
  
  block = 'start';
  behaviour = 'smooth';
  visibleForm = false;

  sinTarjeta = false;

  comercios: any = [];
  selComercio = false;

  // Si tiene red, lo deja hacer login
  puedeLogin: boolean = true;


  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;

  
  constructor(  private usuarioService: UsuarioService,
                private navCtrl: NavController,
                private uiService: UiServiceService,
                private comerciosServices: ComerciosService,
                private dataLocal: DataLocalService,
                private modal: ModalController,
                private loadingController: LoadingController) { }

  async ngOnInit() {

    await this.prueboConexion();


    await this.traerComercios();
    this.slides.lockSwipes(true);
    await this.verTarjetaLocal();
    

  }

  async ionViewWillEnter() {
    
    this.slides.lockSwipes(true);
    await this.verTarjetaLocal();
    
     
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


  async verTarjetaLocal() {

    const usuLocal = await this.dataLocal.traerUsuarioLocal()
    

    if (usuLocal === null ) {
      
      this.sinTarjeta = true;
      return this.sinTarjeta;

    }else {
      
      this.sinTarjeta = false;
      return this.sinTarjeta;
      
    }

  }


  async login( fLogin: NgForm ) {

    
    this.presentLoading( 'Cargando... ' );
    this.cargando = true;


    if( fLogin.invalid ) { return; }

    const valido = await this.usuarioService.login( this.loginUser.dni, this.loginUser.password );
    
     if ( valido ){

          
          
          this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true} );



     }else {

       this.cargando = false;
       this.uiService.alertaInformativa('Usuario y Contraseña no son correctos...');

     }


     setTimeout( () => {
      this.loading.dismiss();
    },1000 );


  }

  async registro( fRegistro: NgForm ) {
    
    this.presentLoading( 'Cargando... ' );
    
    this.cargando = true;

    if (fRegistro.invalid) { return; }

    const valido = await this.usuarioService.registro( this. registerUser );


    if ( valido ){

      this.cargando = true;
      
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true} );

  }else {

    this.cargando = false;
    //this.uiService.alertaInformativa('Error al crear el usuario...')

  }


  setTimeout( () => {
    this.loading.dismiss();
  },1000 );



  }

  


  mostrarRegistro() {
      this.btnAtras = true;
      this.slides.lockSwipes(false);
      this.slides.slideTo(1);
      this.slides.lockSwipes(true);  

  }



  mostrarLogin() {
    this.btnAtras = false;
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }


  async tarjetaLocal( ) {

    let usuarioLocal = await this.dataLocal.traerUsuarioLocal();
        
    const modal = await this.modal.create({
      component: TarjetaLocalPage ,
      componentProps: {

        usuario: usuarioLocal,
        

      }
    });

    await modal.present();

  }

  validarPass( fregistro:NgForm ) {

    if (this.repitePass !== this.registerUser) {

      fregistro.invalid
      
    }


  }

  
  scrollListVisible() {
    this.visibleForm = true;
    let arr = this.list.nativeElement.children;
    let item = arr[1];
    item.scrollIntoView( { behavior: this.behaviour, block: this.block } );
  }




  async traerComercios() {

   await this.comerciosServices.listaComercios().subscribe( resp => { 
     
    this.comercios = resp['comercios'];

  
  });

  
  }

async dataComercio( id ) {

  
  const data = await this.comerciosServices.datosComercio( this.comercios._id );


}

validoForm() {
  this.selComercio = true;
  console.log('Selecciono Comercio');
}


async prueboConexion() {
  // this.networkListener = Network.addListener('networkStatusChange', status => {
  //   console.log('Cambio estado de Conexion', status);
  //   this.networkStatus = status;
  // });

  this.networkStatus = await Network.getStatus();
  
  if (this.networkStatus.connected === false) {
  this.uiService.alertaInformativa('No tiene Internet, no podra registrarse, ni iniciar sesion. Si tiene su tarjeta cargada en el dispositivo podra mostrarla !!!');
  this.puedeLogin = false;
  }else {
    this.puedeLogin = true;
  }


}


}