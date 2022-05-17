import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointments';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  // appointments!: Appointment[]
  //   {
  //     id: 2,
  //     dia: "2020-03-01",
  //     horario: "09:00",
  //     data_agendamento: "2020-02-01T10:45:0-03:00",
  //     medico: {
  //       id: 1,
  //       crm: 3711,
  //       nome: "Drauzio Varella",
  //       especialidade: {
  //         id: 2,
  //         nome: "Pediatria",
  //       },
  //     },
  //   }
  // ]

  displayedColumns = [
    'ESPECIALIDADE',
    'PROFISSIONAL',
    'DATA',
    'HORA',
    'actions'
  ]
  constructor(private appointmentService: AppointmentService, private route: Router) {
  }

  get appointments():Appointment[] {
    return this.appointmentService.appointments;
  }

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe((appointments) => {
      this.appointmentService.appointments = appointments
      console.log(appointments)
    })
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
      this.appointmentService.getAppointments().subscribe((appointments) => { // atualizar as consultas
        this.appointmentService.appointments = appointments
      })
    )
  }

}
