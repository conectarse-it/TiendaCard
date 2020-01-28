import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  posts: Post[] = [];
  

  constructor(  private dataLocal: DataLocalService ) { }

   async ngOnInit() {

      // const favoritos: Post[] = await this.dataLocal.cargarFavoritos();
      // this.posts = favoritos;
    
   }

  async ionViewWillEnter() {
    const favoritos: Post[] = await this.dataLocal.cargarFavoritos();
    this.posts = favoritos;
     
  }

   async recargar(event? ) {
    this.posts = [];
    
    const favoritos = await this.dataLocal.cargarFavoritos();
    
    this.posts = favoritos;
    
  }

}
