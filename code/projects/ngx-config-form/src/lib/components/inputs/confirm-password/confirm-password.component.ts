import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseInput } from '../../../common/baseInput';

@Component({
  selector: 'cf-inputs-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})


export class ConfirmPasswordComponent extends BaseInput implements OnInit, OnDestroy {

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
