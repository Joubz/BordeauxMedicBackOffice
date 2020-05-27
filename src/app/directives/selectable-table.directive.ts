import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import $ from "jquery";

@Directive({
  selector: '[appSelectableTable]'
})
export class SelectableTableDirective {

  @Output() scheduleChange: EventEmitter<string> = new EventEmitter<string>()
  private readonly defaultSlectionClass: string = 'table-primary';

  constructor() {
  }

  @HostListener('click', ['$event']) onClick(event) {
    const el = event.target as Element;

    if (el.tagName == "TR" || el.tagName == "TD") {
      $('tr.table-primary').removeClass(this.defaultSlectionClass);
      event.target.parentNode.classList.add(this.defaultSlectionClass);
      this.scheduleChange.emit(event.target.parentNode.id);
    }
  }

}
