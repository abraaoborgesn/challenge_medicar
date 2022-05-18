import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { Agenda } from '../../interfaces/agenda';
import { Appointment } from '../../interfaces/appointments';
import { Doctor } from '../../interfaces/doctor';
import { MakeAppointment } from '../../interfaces/makeAppointment';
import { Specialty } from '../../interfaces/specialty';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly API = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService
  ) {}

  private appointmentsData = new BehaviorSubject<Appointment[]>([]);
  private especialidadeData = new BehaviorSubject<Specialty[]>([]);
  private medicoData = new BehaviorSubject<Doctor[]>([]);
  private agendaData = new BehaviorSubject<Agenda[]>([]);

  set appointments(appointment: Appointment[]) {
    this.appointmentsData.next(appointment);
  }
  get appointments(): Appointment[] {
    return this.appointmentsData.value;
  }

  set especialidades(especialidade: Specialty[]) {
    this.especialidadeData.next(especialidade);
  }
  get especialidades(): Specialty[] {
    return this.especialidadeData.value;
  }

  set doctors(medico: Doctor[]) {
    this.medicoData.next(medico);
  }
  get doctors(): Doctor[] {
    return this.medicoData.value;
  }

  set agendas(agenda: Agenda[]) {
    this.agendaData.next(agenda);
  }
  get agendas(): Agenda[] {
    return this.agendaData.value;
  }

  // requisições
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API}/consultas`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/consultas/${id}`);
  }

  getSpecialties(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.API}/especialidades`);
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.API}/medicos`);
  }

  getAgenda(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.API}/agendas`);
  }

  makeAppointment(appoint: MakeAppointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.API}/consultas`, appoint);
  }
}
