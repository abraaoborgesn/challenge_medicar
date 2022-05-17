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
  // especialidades: Specialty[] = [
  //   {
  //     nome: 'Teste1'
  //   },
  //   {
  //     nome: 'Teste2'
  //   },
  //   {
  //     nome: 'Teste3'
  //   }
  // ]

  // medicos: Doctor[]
  // agendas: Agenda[]
  medicos2: Doctor[];
  agendas2: Agenda[];
  horarios: string[];
  appointment: MakeAppointment;

  habilitarButton: boolean = true


  constructor( private matDialogRef: MatDialogRef<any>, private appointmentService: AppointmentService) {
    // this.medicos = []
    // this.agendas = []
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
      console.log(this.especialidades)
  })
    this.appointmentService.getMedicos2().subscribe((medicos) => {
      this.appointmentService.medicos = medicos
      console.log(this.medicos)
  })
    this.appointmentService.getAgenda().subscribe((agendas) => {
      this.appointmentService.agendas = agendas
    })

}
  // habilitar o button de confirmar
  habilitarForm(): void {
    this.habilitarButton = !this.habilitarButton
  }

  handleClose(): void {
    this.matDialogRef.close()
  }

  // handleEspecialidade(value: number): void {
  //   this.appointmentService.getMedicos(value).subscribe((medicos) => {this.medicos = medicos})
  //   // console.log(this.medicos)
  // }

  //Buscando os dados
  handleEspecialidade(value: string): void {
    let newMedicos = this.medicos.filter(e => {
      return e.especialidade.nome === value
    })

    this.medicos2 = [...newMedicos]
  }

  handleMedico(value: number): void {
    let newAgendas = this.agendas.filter(e => {
      return e.medico.id === value
    })

    this.agendas2 = [...newAgendas]
  }

  // handleData(value: number): void {
  //   let agendasForId = this.agendas.filter(e => {
  //     return e.id === value
  //   })

  //   this.horarios = agendasForId.horarios
  // }

  handleData(value: number) {
    this.horarios = <string[]>(
      this.agendas.find((data) => data.id == value)?.horarios
    );
  }

  // handleMedico(value: number): void {
  //   this.appointmentService.getData(value).subscribe((agendas) => {this.agendas = agendas})
  // }

  // handleData(value: number): void {
  //   this.appointmentService.getHorario(value)
  // }

  handleSubmit(): void {
    console.log(this.appointment)
    this.appointmentService.makeAppointment(this.appointment).subscribe((appoint: Appointment) => {
      let newAppoints = [...this.appointmentService.appointments]
      newAppoints.push(appoint)
      this.appointmentService.getAppointments().subscribe((appointments) => { // atualizar as consultas
        this.appointmentService.appointments = appointments
      })
      this.appointmentService.appointments = newAppoints

    })

    this.handleClose()
  }
}
