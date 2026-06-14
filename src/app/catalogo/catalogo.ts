import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { VueloFiltro } from '../vuelos-filtro';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgFor, NgIf],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  vuelos = signal<any[]>([]);

  constructor(
    private http: HttpClient,
    public vuelosFiltro: VueloFiltro
  ) {}

  ngOnInit() {
    this.http.get<any[]>('/vuelos.json').subscribe({
      next: (data) => this.vuelos.set(data),
      error: (err) => console.error('Error cargando vuelos:', err)
    });
  }

  vuelosFiltrados = computed(() => {
    const origen = this.vuelosFiltro.filtroOrigen();
    const destino = this.vuelosFiltro.filtroDestino();

    if (!this.vuelosFiltro.busquedaRealizada()) {
      return this.vuelos();
    }

    return this.vuelos().filter(v =>
      v.origen.toLowerCase().includes(origen) &&
      v.destino.toLowerCase().includes(destino)
    );
  });

  resultadosBusqueda = computed(() => {
    const origen = this.vuelosFiltro.filtroOrigen();
    const destino = this.vuelosFiltro.filtroDestino();

    return this.vuelos().filter(v =>
      v.origen.toLowerCase().includes(origen) &&
      v.destino.toLowerCase().includes(destino)
    );
  });

  cerrarModal() {
    this.vuelosFiltro.limpiar();
  }
}