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
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() click = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickIt(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!this.cfFormGroup.dirty) {
      return;
    }
    if (this.cfFormGroup.invalid) {
      return;
    }

    this.click.emit(event);
  }

}
