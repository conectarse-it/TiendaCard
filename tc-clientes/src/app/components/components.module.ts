import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from "./posts/posts.component";
import { PostComponent } from "./post/post.component";
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';
import { HeaderComponent } from './header/header.component';
import { QrComponent } from './qr/qr.component';
import { NgxQRCodeModule } from "ngx-qrcode2";



@NgModule({
  declarations: [
    
    AvatarSelectorComponent,
    PostsComponent,
    PostComponent,
    MapaComponent,
    HeaderComponent,
    QrComponent

  ],

  exports: [
    
    PostsComponent,
    PostComponent,
    AvatarSelectorComponent,
    MapaComponent,
    HeaderComponent,
    QrComponent
    

  ],

  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    NgxQRCodeModule,
  ]
})
export class ComponentsModule { }
