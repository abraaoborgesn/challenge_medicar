import { Specialty } from './specialty';

export interface Doctor {
  id?: number;
  crm: number;
  nome: string;
  especialidade: Specialty;
}
