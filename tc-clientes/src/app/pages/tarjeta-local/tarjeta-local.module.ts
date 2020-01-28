import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { TarjetaLocalPage } from './tarjeta-local.page';
import { ComponentsModule } from '../../components/components.module';

import { NgxQRCodeModule } from "ngx-qrcode2";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    ComponentsModule
    
  ],
  declarations: [TarjetaLocalPage]
})
export class TarjetaLocalPageModule {}
