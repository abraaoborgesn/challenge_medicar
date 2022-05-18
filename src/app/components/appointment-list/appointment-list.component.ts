import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointments';
import { AppointmentService } from 'src/app/services/appointments/appointment.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit {
  displayedColumns = [
    'ESPECIALIDADE',
    'PROFISSIONAL',
    'DATA',
    'HORA',
    'actions',
  ];
  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  //Usado no [dataSource] da table
  get appointments(): Appointment[] {
    return this.appointmentService.appointments;
  }

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe((appointments) => {
      //buscando as consultas
      this.appointmentService.appointments = appointments;
    });
  }

  // forTable
  especialidade(appoint: Appointment): string {
    return appoint.medico.especialidade.nome;
  }
  profissional(appoint: Appointment): string {
    return appoint.medico.nome;
  }
  data(appoint: Appointment): string {
    return appoint.dia;
  }
  hora(appoint: Appointment): string {
    return appoint.horario;
  }

  //clicks
  handleDelete(id: number): void {
    this.appointmentService.delete(id).subscribe(() =>
      this.appointmentService.getAppointments().subscribe((appointments) => {
        // atualizar as consultas
        this.appointmentService.appointments = appointments;
      })
    );
  }
}
