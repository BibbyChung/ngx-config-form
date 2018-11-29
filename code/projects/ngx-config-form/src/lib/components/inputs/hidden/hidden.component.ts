import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseInput } from '../../../common/baseInput';

@Component({
  selector: 'cf-inputs-hidden',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.scss']
})
export class HiddenComponent extends BaseInput implements OnInit, OnDestroy {

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
