import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VueloService } from '../vuelo.service';

@Component({
  selector: 'app-body',
  imports: [CommonModule, FormsModule],
  templateUrl: './body.html',
  styleUrl: './body.css'
})
export class Body {
  tituloAvion = '';
descripcionAvion = '';
imagenAvion = '';
mostrarModal = false;
  origen = '';
  destino = '';
  fecha = '';
  buscando = false;
  errorMsg = '';
  fechaMinima = new Date().toISOString().split('T')[0];

  origenes = [
    { label: 'Ciudad de México (MEX)', value: 'Ciudad de México' },
    { label: 'Guadalajara (GDL)',       value: 'Guadalajara' },
    { label: 'Monterrey (MTY)',         value: 'Monterrey' }
  ];

  destinos = [
    { label: 'Cancún',           value: 'Cancún' },
    { label: 'Guadalajara',      value: 'Guadalajara' },
    { label: 'Monterrey',        value: 'Monterrey' },
    { label: 'Puerto Vallarta',  value: 'Puerto Vallarta' },
    { label: 'Los Cabos',        value: 'Los Cabos' },
    { label: 'Mazatlán',         value: 'Mazatlán' },
    { label: 'Mérida',           value: 'Mérida' },
    { label: 'Tijuana',          value: 'Tijuana' },
    { label: 'Oaxaca',           value: 'Oaxaca' },
    { label: 'Veracruz',         value: 'Veracruz' },
    { label: 'Acapulco',         value: 'Acapulco' },
    { label: 'La Paz',           value: 'La Paz' },
    { label: 'Chihuahua',        value: 'Chihuahua' },
    { label: 'Huatulco',         value: 'Huatulco' },
    { label: 'Tampico',          value: 'Tampico' },
    { label: 'Villahermosa',     value: 'Villahermosa' },
    { label: 'Ciudad Juárez',    value: 'Ciudad Juárez' },
    { label: 'Hermosillo',       value: 'Hermosillo' },
    { label: 'Culiacán',         value: 'Culiacán' }
  ];

  constructor(private vueloService: VueloService, private router: Router) {}

  buscar() {
    if (!this.origen || !this.destino) {
      this.errorMsg = 'Por favor selecciona origen y destino.';
      return;
    }
    this.errorMsg = '';
    this.buscando = true;

    this.vueloService.buscarVuelos(this.origen, this.destino, this.fecha).subscribe({
      next: (res: any[]) => {
        this.buscando = false;
        sessionStorage.setItem('resultadosVuelos', JSON.stringify(res));
        this.router.navigate(['/catalogo']);
      },
      error: () => {
        this.buscando = false;
        this.errorMsg = 'Error al buscar. ¿Está corriendo JSON Server?';
      }
    });
  }
mostrarInfoAvion(tipo: string) {

  if (tipo === 'fenix') {
    this.tituloAvion = 'AM-01 Fénix';
    this.imagenAvion = '/avion1.png';
    this.descripcionAvion =
      'El AM-01 Fénix fue el primer avión oficial de Aeromono.\n\n' +
      '• Capacidad: 180 pasajeros\n' +
      '• Alcance: 5,500 km\n' +
      '• Velocidad crucero: 850 km/h\n\n' +
      'Diseñado para rutas nacionales, destacó por su eficiencia, seguridad y comodidad.';
  }

  if (tipo === 'condor') {
    this.tituloAvion = 'AM-02 Cóndor';
    this.imagenAvion = '/avion2.png';
    this.descripcionAvion =
      'El AM-02 Cóndor fue el segundo avión oficial de Aeromono.\n\n' +
      '• Capacidad: 220 pasajeros\n' +
      '• Alcance: 7,000 km\n' +
      '• Velocidad crucero: 900 km/h\n\n' +
      'Incorporó nuevas tecnologías y una mayor autonomía para vuelos nacionales e internacionales.';
  }

  this.mostrarModal = true;
}

cerrarModal() {
  this.mostrarModal = false;
}
}