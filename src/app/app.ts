import { Component, signal } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Header } from "./header/header";
import { Body } from "./body/body";
import { Section } from "./section/section";
import { Reservacion } from "./reservacion/reservacion";
import { Catalogo } from "./catalogo/catalogo";


@Component({
  selector: 'app-root',
  imports: [Navbar, Header, Body, Section, Reservacion, Catalogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Aero');
}
