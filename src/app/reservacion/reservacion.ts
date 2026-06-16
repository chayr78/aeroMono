import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VueloService } from '../vuelo.service';

@Component({
  selector: 'app-reservacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservacion.html',
  styleUrl: './reservacion.css',
})
export class Reservacion implements OnInit {

  reserva = { nombre: '', origen: '', destino: '', fecha: '', pasajeros: 1 };
  confirmada = false;
  error = false;
  guardando = false;
  folioGenerado = '';
  fechaMinima = new Date().toISOString().split('T')[0];

  folioBusqueda = '';
  reservaEncontrada: any = null;
  buscando = false;
  errorBusqueda = '';
  modoVista: 'formulario' | 'busqueda' = 'formulario';

  origenes: string[] = [];
  destinos: string[] = [];

  constructor(private vueloService: VueloService) {}

  ngOnInit() {
    // Carga origenes y destinos únicos desde los vuelos reales
    this.vueloService.getVuelos().subscribe({
      next: (vuelos) => {
        const setOrigenes = new Set<string>();
        const setDestinos = new Set<string>();
        vuelos.forEach(v => {
          if (v.origen) setOrigenes.add(v.origen);
          if (v.destino) setDestinos.add(v.destino);
        });
        this.origenes = Array.from(setOrigenes).sort();
        this.destinos = Array.from(setDestinos).sort();
      }
    });
  }

  private generarFolio(): string {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const parte1 = Array.from({ length: 3 }, () =>
      letras[Math.floor(Math.random() * letras.length)]).join('');
    const parte2 = Math.floor(1000 + Math.random() * 9000);
    return `${parte1}-${parte2}`;
  }

  reservar() {
    if (!this.reserva.nombre || !this.reserva.origen ||
        !this.reserva.destino || !this.reserva.fecha) {
      this.error = true;
      return;
    }
    this.error = false;
    this.guardando = true;
    this.confirmada = false;
    this.folioGenerado = '';

    const folio = this.generarFolio();
    const nuevaReserva = {
      ...this.reserva,
      folio,
      creadoEn: new Date().toISOString()
    };

    this.vueloService.crearReservacion(nuevaReserva).subscribe({
      next: () => {
        this.folioGenerado = folio;
        this.confirmada = true;
        this.guardando = false;
      },
      error: () => {
        this.guardando = false;
        this.error = true;
      }
    });
  }

  buscarFolio() {
    const folio = this.folioBusqueda.trim().toUpperCase();
    if (!folio) {
      this.errorBusqueda = 'Ingresa un folio.';
      return;
    }
    this.buscando = true;
    this.errorBusqueda = '';
    this.reservaEncontrada = null;

    this.vueloService.buscarPorFolio(folio).subscribe({
      next: (res) => {
        this.buscando = false;
        if (res.length > 0) {
          this.reservaEncontrada = res[0];
        } else {
          this.errorBusqueda = `No se encontro ninguna reservacion con el folio "${folio}".`;
        }
      },
      error: () => {
        this.buscando = false;
        this.errorBusqueda = 'Error al conectar. Verifica que JSON Server este corriendo.';
      }
    });
  }

  nueva() {
    this.reserva = { nombre: '', origen: '', destino: '', fecha: '', pasajeros: 1 };
    this.confirmada = false;
    this.error = false;
    this.folioGenerado = '';
    this.guardando = false;
  }
}