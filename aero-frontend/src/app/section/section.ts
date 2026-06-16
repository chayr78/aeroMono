import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VueloService } from '../vuelo.service';

@Component({
  selector: 'app-section',
  imports: [CommonModule],
  templateUrl: './section.html',
  styleUrl: './section.css',
})
export class Section {

  constructor(private vueloService: VueloService, private router: Router) {}

  verVuelos(destino: string, event: Event) {
    event.preventDefault();
    this.vueloService.getVuelos().subscribe({
      next: (todos) => {
        const filtrados = todos.filter(v =>
          v.destino.toLowerCase().includes(destino.toLowerCase())
        );
        sessionStorage.setItem('resultadosVuelos', JSON.stringify(filtrados));
        this.router.navigate(['/catalogo']);
      }
    });
  }
}