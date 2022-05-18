import { Doctor } from './doctor';

export interface Appointment {
  id?: number;
  dia: string;
  horario: string;
  data_agendamento: string;
  medico: Doctor;
}
