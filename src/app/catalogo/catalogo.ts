import { Component, signal, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VueloService } from '../vuelo.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {
  vuelos = signal<any[]>([]);
  vueloSeleccionado: any = null;

  constructor(private vueloService: VueloService) {}

  ngOnInit() {
    const guardados = sessionStorage.getItem('resultadosVuelos');
    if (guardados) {
      try {
        const parsed = JSON.parse(guardados);
        this.vuelos.set(Array.isArray(parsed) ? parsed : []);
      } catch {
        this.vuelos.set([]);
      }
    }
  }

  getAerolinea(vuelo: any): string { return vuelo.aerolinea ?? ''; }
  getFecha(vuelo: any): string     { return vuelo.fecha ?? ''; }
  getHora(vuelo: any): string      { return vuelo.hora ?? ''; }
  getDuracion(vuelo: any): string  { return vuelo.duracion ?? ''; }
  getPrecio(vuelo: any): number    { return vuelo.precio ?? 0; }

  seleccionar(vuelo: any) {
    this.vueloSeleccionado = vuelo;
    sessionStorage.setItem('vueloSeleccionado', JSON.stringify(vuelo));
  }
}