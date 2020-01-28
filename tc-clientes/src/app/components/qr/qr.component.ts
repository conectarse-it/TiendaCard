import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {

  
  public qrData = {};
  public createdCode = null;

  public usuario: Usuario = {};
  
  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(  ) {

    
    this.usuario = this.usuarioService.getUsuario();
    
    
    
    
    this.codigoQr();

  }


  codigoQr() {

    let tipo = 'Tienda Card - Classic';

    if( this.usuario['tipoTarjeta'] === 0 ) {
      tipo = 'Tienda Card - Classic';
      
    }else {
        if ( this.usuario['tipoTarjeta'] === 1 ) {
            tipo = 'Tienda Card - Premium';
            
        }   else {
                tipo = 'Tienda Card - Otras';
                
                }
    }


    this.qrData = `  
    "cliente": ${this.usuario.nombre} ${this.usuario.apellido}, 
    "dni": ${this.usuario.dni}, 
    "direccion": ${this.usuario.direccion}, 
    "tipoTarjeta": ${tipo}, 
    "comercio": Supermercado Nini `;
    
    
    this.createdCode = this.qrData;
  }

}
