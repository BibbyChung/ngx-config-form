import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseInput } from '../../../common/baseInput';
import { IForm } from '../../../common/IForm';
import { IFormSetting } from '../../../common/IFormSetting';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'cf-inputs-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() propName: string;
  @Input() cfFormSetting: IFormSetting;
  @Input() cfFormGroup: FormGroup;

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
