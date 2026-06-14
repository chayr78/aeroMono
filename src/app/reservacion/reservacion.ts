import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-reservacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservacion.html',
  styleUrl: './reservacion.css',
})
export class Reservacion {

  reserva = {
    nombre: '',
    destino: '',
    fecha: '',
    pasajeros: 1
  };

  confirmada = false;
  error = false;
  fechaMinima = new Date().toISOString().split('T')[0];  // ← fecha de hoy

  destinos = [
    'Cancún',
    'Puerto Vallarta',
    'Guadalajara',
    'Mazatlán',
    'Los Cabos'
  ];

  reservar() {
    if (!this.reserva.nombre || !this.reserva.destino || !this.reserva.fecha) {
      this.error = true;
      return;
    }
    this.error = false;
    this.confirmada = true;

    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
      modal.show();
    }, 100);
  }

  nueva() {
    this.reserva = { nombre: '', destino: '', fecha: '', pasajeros: 1 };
    this.confirmada = false;
    this.error = false;
  }
}