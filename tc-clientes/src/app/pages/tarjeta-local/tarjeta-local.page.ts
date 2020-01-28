import { Component, OnInit, Input } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { ModalController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Storage } from '@ionic/storage';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-tarjeta-local',
  templateUrl: './tarjeta-local.page.html',
  styleUrls: ['./tarjeta-local.page.scss'],
})
export class TarjetaLocalPage implements OnInit {



  @Input() usuario: any = {};
  public prem: boolean = false;
  habilitado = true;

  public comercio: any

  
  constructor(  private modalCtrl: ModalController,
                private screenOrientation: ScreenOrientation,
                private storage: Storage,
                private ui: UiServiceService ) { }

  ngOnInit() {   
     
    this.comercio = this.usuario.comercio['razonSocial']; 
    
    this.tipoDeTarjeta();
      // set to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

                                
  }
                
                
  ionViewWillEnter() {
      // set to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
                     
  }
                
  ionViewWillLeave() {
      // set to landscape
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
                     
  }

  cerrar() {
        this.modalCtrl.dismiss();
  }

  async eliminar() {
    let vacio = null;
    
    this.ui.alertaInformativa( 'Se ha eliminando la Tarjeta almacena en el dispositivo.' )
    
    //this.storage.remove('usuario');
    const limpio = await this.storage.set('usuario', vacio);
    
    this.habilitado = false;

    window.location.reload();
    //this.modalCtrl.dismiss();
  }



  tipoDeTarjeta() {
    

    if ( this.usuario['tipoTarjeta'] === 1 ) {
      this.prem = true;
      
    } else {
      this.prem = false;
    }

  }


}
