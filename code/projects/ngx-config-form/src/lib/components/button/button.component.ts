import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cf-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() cfFormGroup: FormGroup;
  @Input() class = '';
  @Input() isDebug: 'Y' | 'N' = 'N';
  @Output() dfClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  trigger(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (this.cfFormGroup.invalid) {
      return;
    }

    this.dfClick.emit(event);
  }

}
