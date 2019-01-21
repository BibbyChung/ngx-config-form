import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseInput } from '../../../common/baseInput';

@Component({
  selector: 'cf-inputs-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() isReadOnly = false;
  @Input() type = 'text';
  @Input() inputClass: string;
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
