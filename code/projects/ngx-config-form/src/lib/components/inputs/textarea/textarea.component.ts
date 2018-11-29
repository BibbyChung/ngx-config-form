import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseInput } from '../../../common/baseInput';

@Component({
  selector: 'cf-inputs-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() rows = 3;
  @Input() isReadOnly = false;
  @Input() class: string;

  @Input() propName: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
