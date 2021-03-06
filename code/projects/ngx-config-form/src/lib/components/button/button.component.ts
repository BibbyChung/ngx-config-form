import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cf-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() cfFormGroup: FormGroup;
  @Input() buttonClass = '';
  @Input() isDebug: 'Y' | 'N' = 'N';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() isProcessing = false;

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

    if (this.isProcessing) {
      return;
    }

    this.click.emit(event);
  }

}
