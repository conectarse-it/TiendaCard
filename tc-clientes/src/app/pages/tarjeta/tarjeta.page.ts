import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ComerciosService } from '../../services/comercios.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  public usuario: Usuario = {};
  public prem: boolean = false;

  public comercio: any
 

  
  constructor(  private usuarioService: UsuarioService,
                private screenOrientation: ScreenOrientation,
                private comercioService: ComerciosService,
                private storage: Storage ) { }

  async ngOnInit() {


  this.usuario = this.usuarioService.getUsuario();
  
  this.comercio = this.usuario.comercio['razonSocial'];
  
  
  
  this.tipoDeTarjeta();


  
  // set to landscape
  this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);



  }


  async ionViewWillEnter() {
    // set to landscape
    const giro = await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
     
  }

  async ionViewWillLeave() {
    // set to landscape
    const giro = await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
     
  }


  tipoDeTarjeta() {
    
    if ( this.usuario['tipoTarjeta'] === 1 ) {
      this.prem = true;
      
    } else {
      this.prem = false;
    }

  }


}