import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VueloFiltro {
  filtroOrigen = signal<string>('');
  filtroDestino = signal<string>('');
  busquedaRealizada = signal<boolean>(false);
  abrirModal = signal<boolean>(false);  // ← agrega

  buscar(origen: string, destino: string) {
    this.filtroOrigen.set(origen.trim().toLowerCase());
    this.filtroDestino.set(destino.trim().toLowerCase());
    this.busquedaRealizada.set(true);
    this.abrirModal.set(true);  // ← agrega
  }

  limpiar() {
    this.filtroOrigen.set('');
    this.filtroDestino.set('');
    this.busquedaRealizada.set(false);
    this.abrirModal.set(false);  // ← agrega
  }
}