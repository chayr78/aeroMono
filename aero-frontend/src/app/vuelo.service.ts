import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VueloService {
  private api = 'https://aero-backend-production-4fb8.up.railway.app';

  constructor(private http: HttpClient) {}

  getVuelos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/vuelos`);
  }

  buscarVuelos(origen: string, destino: string, fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/vuelos`).pipe(
      map(vuelos => vuelos.filter(v => {
        const matchOrigen  = origen  ? v.origen.toLowerCase().includes(origen.toLowerCase())  : true;
        const matchDestino = destino ? v.destino.toLowerCase().includes(destino.toLowerCase()): true;
        const matchFecha   = fecha   ? v.fecha >= fecha : true;
        return matchOrigen && matchDestino && matchFecha;
      }))
    );
  }

  crearReservacion(reserva: any): Observable<any> {
    return this.http.post(`${this.api}/reservaciones`, reserva);
  }

  buscarPorFolio(folio: string): Observable<any[]> {
    // Trae todo y filtra localmente — compatible con cualquier versión de JSON Server
    return this.http.get<any[]>(`${this.api}/reservaciones`).pipe(
      map((res: any[]) => res.filter(r =>
        r.folio?.trim().toUpperCase() === folio.trim().toUpperCase()
      ))
    );
  }
}