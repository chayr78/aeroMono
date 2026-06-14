import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VueloFiltro } from '../vuelos-filtro';

@Component({
  selector: 'app-section',
  imports: [CommonModule],
  templateUrl: './section.html',
  styleUrl: './section.css',
})
export class Section {

  constructor(public vuelosFiltro: VueloFiltro) {}

 verVuelos(destino: string, event: Event) {
  event.preventDefault();
  console.log('Destino clickeado:', destino);
  this.vuelosFiltro.buscar('', destino);
  console.log('filtroDestino después:', this.vuelosFiltro.filtroDestino());
  console.log('abrirModal después:', this.vuelosFiltro.abrirModal());
}
  
}
