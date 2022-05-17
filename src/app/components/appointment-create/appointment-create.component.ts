import { Component, OnInit } from '@angular/core';
import { Specialty } from 'src/app/interfaces/specialty';
import { AppointmentService } from 'src/app/services/appointment.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Doctor } from 'src/app/interfaces/doctor';
import { Agenda } from 'src/app/interfaces/agenda';
import { MakeAppointment } from 'src/app/interfaces/makeAppointment';
import { Appointment } from 'src/app/interfaces/appointments';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss']
})
export class AppointmentCreateComponent implements OnInit {
  // medicos: Doctor[]
  // agendas: Agenda[]
  medicos2: Doctor[];
  agendas2: Agenda[];
  horarios: string[];
  appointment: MakeAppointment;

  habilitarButton: boolean = true


  constructor( private matDialogRef: MatDialogRef<any>, private appointmentService: AppointmentService) {
    this.medicos2 = []
    this.agendas2 = []
    this.horarios = []
    this.appointment = <MakeAppointment>{}
  }

  get especialidades(): Specialty[] {
    return this.appointmentService.especialidades
  }

  get medicos(): Doctor[] {
    return this.appointmentService.medicos
  }

  get agendas(): Agenda[] {
    return this.appointmentService.agendas
  }


  ngOnInit(): void {
    this.appointmentService.getSpecialties().subscribe((especialidades) => {
      this.appointmentService.especialidades = especialidades
  })
    this.appointmentService.getMedicos2().subscribe((medicos) => {
      this.appointmentService.medicos = medicos
  })
    this.appointmentService.getAgenda().subscribe((agendas) => {
      this.appointmentService.agendas = agendas
    })

}
  // habilitar o button de confirmar
  habilitarForm(): void {
    this.habilitarButton = !this.habilitarButton
  }

  //Close modal
  handleClose(): void {
    this.matDialogRef.close()
  }

  //Buscando os dados
  handleEspecialidade(value: string): void {
    let newMedicos = this.medicos.filter(res => {
      return res.especialidade.nome === value
    })

    this.medicos2 = [...newMedicos]
  }

  handleMedico(value: number): void {
    let newAgendas = this.agendas.filter(res => {
      return res.medico.id === value
    })

    this.agendas2 = [...newAgendas]
  }

  handleData(value: number) {
    this.horarios = <string[]>(
      this.agendas.find((res) => res.id == value)?.horarios
    );
  }

  //Submit
  handleSubmit(): void {
    // console.log(this.appointment)
    this.appointmentService.makeAppointment(this.appointment).subscribe((appoint: Appointment) => {
      let newAppoints = [...this.appointmentService.appointments]
      newAppoints.push(appoint)
      this.appointmentService.getAppointments().subscribe((appointments) => { // refresh appointments
        this.appointmentService.appointments = appointments
      })
      this.appointmentService.appointments = newAppoints
    })

    this.handleClose()
  }
}
