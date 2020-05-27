import {Pipe, PipeTransform} from '@angular/core';
import {Gender} from "../enum/gender";

@Pipe({
  name: 'genderText'
})
export class GenderTextPipe implements PipeTransform {

  transform(value: Gender): string {
    console.log(value);
    if (value == Gender.MALE) {
      return "Homme";
    } else if (value == Gender.FEMALE) {
      return "Femme";
    }

  }

}
