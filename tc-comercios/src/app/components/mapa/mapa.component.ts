import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa', { static: true }) mapa;
  
  constructor() { }

  ngOnInit() {
    
    
    const latLng = this.coords.split(',');
    const lat = Number( latLng[0] );
    const lng = Number( latLng[1] );

    //mapbox://styles/mapbox/streets-v11'
    mapboxgl.accessToken = 'pk.eyJ1IjoidGllbmRhY2FyZCIsImEiOiJjazBtbmFjYnAwOHI1M21rYmtkYW1jNjlhIn0.ClOG7J_OwlH077ZAck89Tg';
        const map = new mapboxgl.Map({
        container: this.mapa.nativeElement,
        style: 'mapbox://styles/mapbox/navigation-guidance-day-v2',
        interactive: false,
        center: [ lng, lat ],
        zoom: 15
    });

    const marker = new mapboxgl.Marker()
          .setLngLat( [ lng, lat ] )
          .addTo( map );


  }

}
