import { Component, OnInit } from '@angular/core';
import { Specialty } from 'src/app/interfaces/specialty';
import { AppointmentService } from 'src/app/services/appointments/appointment.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Doctor } from 'src/app/interfaces/doctor';
import { Agenda } from 'src/app/interfaces/agenda';
import { MakeAppointment } from 'src/app/interfaces/makeAppointment';
import { Appointment } from 'src/app/interfaces/appointments';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss'],
})
export class AppointmentCreateComponent implements OnInit {
  doctorsFiltered: Doctor[];
  agendasFiltered: Agenda[];
  schedule: string[];
  appointment: MakeAppointment;
  temMedico: boolean = false

  habilitarButton: boolean = true;

  constructor(
    private matDialogRef: MatDialogRef<any>,
    private appointmentService: AppointmentService
  ) {
    this.doctorsFiltered = [];
    this.agendasFiltered = [];
    this.schedule = [];
    this.appointment = <MakeAppointment>{};
  }

  get especialidades(): Specialty[] {
    return this.appointmentService.especialidades;
  }
  get medicos(): Doctor[] {
    return this.appointmentService.doctors;
  }
  get agendas(): Agenda[] {
    return this.appointmentService.agendas;
  }

  ngOnInit(): void {
    this.appointmentService.getSpecialties().subscribe((especialidades) => {
      this.appointmentService.especialidades = especialidades;
    });
    this.appointmentService.getDoctors().subscribe((doctors) => {
      this.appointmentService.doctors = doctors;
    });
    this.appointmentService.getAgenda().subscribe((agendas) => {
      this.appointmentService.agendas = agendas;
    });
  }
  //Habilitar o button de confirmar
  habilitarForm(): void {
    this.habilitarButton = !this.habilitarButton;
  }

  //Close modal
  handleClose(): void {
    this.matDialogRef.close();
  }

  //Buscando as especialidades
  handleSpecialty(value: string): void {
    this.doctorsFiltered = this.medicos.filter((res) => {
      return res.especialidade.nome === value;
    });
  }

  //Filtrando os dados do array de Medicos e Agendas
  handleDoctor(value: number): void {
    this.agendasFiltered = this.agendas.filter((res) => {
      return res.medico.id === value;
    });
  }

  handleData(value: number) {
    this.schedule = <string[]>(
      this.agendas.find((res) => res.id == value)?.horarios
    );
  }

  //Submit
  handleSubmit(): void {
    this.appointmentService
      .makeAppointment(this.appointment)
      .subscribe((appoint: Appointment) => {
        let newAppoints = [...this.appointmentService.appointments];
        newAppoints.push(appoint);
        this.appointmentService.getAppointments().subscribe((appointments) => {
          // refresh appointments
          this.appointmentService.appointments = appointments;
        });
        this.appointmentService.appointments = newAppoints;
      });

    this.handleClose();
  }

}
