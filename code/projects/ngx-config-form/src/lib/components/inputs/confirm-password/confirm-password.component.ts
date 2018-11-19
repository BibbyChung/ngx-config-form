import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseInput } from '../../../common/baseInput';
import { IForm } from '../../../common/IForm';
import { ISetting } from '../../../common/ISetting';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'cf-inputs-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})


export class ConfirmPasswordComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() ngClass: string[] = [];

  @Input() dfFormGroup: FormGroup;
  @Input() setting: ISetting;

  constructor(
    @Inject(forwardRef(() => FormComponent)) host: IForm
  ) {
    super(host);
  }

  ngOnInit(): void {
    super.superInit();
  }

  ngOnDestroy(): void {
    this.superDestroy();
  }

}
