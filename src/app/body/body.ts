import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VueloFiltro } from '../vuelos-filtro';

@Component({
  selector: 'app-body',
  imports: [FormsModule],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {
  origen = '';
  destino = '';

  constructor(private vuelosFiltro: VueloFiltro) {}

  buscar() {
    this.vuelosFiltro.buscar(this.origen, this.destino);
  }
}