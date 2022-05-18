import { Doctor } from './doctor';

export interface Agenda {
  id: number;
  medico: Doctor;
  dia: string;
  horarios: Array<string>;
}
