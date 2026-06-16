import { Routes } from '@angular/router';
import { Body } from './body/body';
import { Catalogo } from './catalogo/catalogo';
import { Reservacion } from './reservacion/reservacion';
import { Section } from './section/section';

export const routes: Routes = [
  { path: '', component: Body },
  { path: 'catalogo', component: Catalogo },
  { path: 'reservar', component: Reservacion },
  { path: 'destinos', component: Section },
  { path: '**', redirectTo: '' }
];