import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { TarjetaLocalPageModule } from '../tarjeta-local/tarjeta-local.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TarjetaLocalPageModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
