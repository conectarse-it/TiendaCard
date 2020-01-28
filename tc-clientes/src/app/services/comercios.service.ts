import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})




export class ComerciosService {

  constructor( private http: HttpClient ) { }


  listaComercios() {

    return this.http.get(`${URL}/comercio/list`);

  };

  async datosComercio( id: string ) {

    const data = await this.http.get( `${URL}/comercio/${id}` ).subscribe( respuesta => {

    });
  }
}
