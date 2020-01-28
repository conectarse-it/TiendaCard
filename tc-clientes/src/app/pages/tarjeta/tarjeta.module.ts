import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TarjetaPage } from './tarjeta.page';
import { ComponentsModule } from '../../components/components.module';

import { NgxQRCodeModule } from "ngx-qrcode2";

const routes: Routes = [
  {
    path: '',
    component: TarjetaPage
  }
];

@NgModule({
  
  exports: [ TarjetaPage ],
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NgxQRCodeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TarjetaPage]
})
export class TarjetaPageModule {}
