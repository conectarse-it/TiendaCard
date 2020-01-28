import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(  public alertCrl: AlertController,
                public toastCtrl: ToastController ) { }

  async alertaInformativa( message: string  ) {
    const alert = await this.alertCrl.create({
      
      message,
      buttons: ['OK']
      
    });

    await alert.present();
  }


  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }


}
