export class Patient {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  height: number;
  weight: number;

  /*constructor(lastName: string, firstName: string, phone: string, email: string, dateOfBirth: string, gender: string, height: number, weight: number) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.phone = phone;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
  }*/

  constructor(init?: Partial<Patient>) {
    Object.assign(this, init);
  }
}
