import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseInput } from '../../../common/baseInput';
import { IForm } from '../../../common/IForm';
import { IInputSetting } from '../../../common/IInputSetting';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'cf-inputs-hidden',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.scss']
})
export class HiddenComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() cfFormGroup: FormGroup;
  @Input() inputSetting: IInputSetting;

  constructor(
    @Inject(forwardRef(() => FormComponent)) host: IForm
  ) {
    super(host);
  }

  ngOnInit(): void {
    super.superInit();
  }

  ngOnDestroy(): void {
    super.superDestroy();
  }

}
