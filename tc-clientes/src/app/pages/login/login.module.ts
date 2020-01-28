import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { ComponentsModule } from '../../components/components.module';
import { TarjetaLocalPage } from '../tarjeta-local/tarjeta-local.page';
import { TarjetaLocalPageModule } from '../tarjeta-local/tarjeta-local.module';



const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({

  entryComponents: [ TarjetaLocalPage ],

  imports: [
    CommonModule,
    TarjetaLocalPageModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],

  declarations: [LoginPage]
})
export class LoginPageModule {}
