import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.page.html',
  styleUrls: ['./comercios.page.scss'],
})
export class ComerciosPage implements OnInit {

  constructor( private router: Router  ) { }

  ngOnInit() {
  }


  nuevoPost() {
    this.router.navigateByUrl('main/tabs/tab2');
  }


  nuevoComercio() {
    this.router.navigateByUrl('comercio-alta');
  }


  perfilComercio() {
    this.router.navigateByUrl('comercio-perfil');
  }

}
