import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseInput } from '../../../common/baseInput';

@Component({
  selector: 'cf-inputs-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() propName: string;
  @Input() inputClass: string;

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
