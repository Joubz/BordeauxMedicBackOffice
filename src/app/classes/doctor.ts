export interface Doctor {
  readonly id: number;
  lastName: string;
  firstName: string;
  speciality: string;
  address: string;
  morningStartHour;
  morningEndHour: number;
  afternoonStartHour: number;
  afternoonEndHour: number;
  appointmentLast: number;
}
