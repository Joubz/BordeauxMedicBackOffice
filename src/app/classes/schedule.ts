export class Schedule {
  date: Date;
  time: string;
  unformated: string;


  constructor(date: Date, time: string, unformated: string) {
    this.date = date;
    this.time = time;
    this.unformated = unformated;
  }
}
