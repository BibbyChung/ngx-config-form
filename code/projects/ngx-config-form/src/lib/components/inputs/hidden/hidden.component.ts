import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseInput } from '../../../common/baseInput';
import { IForm } from '../../../common/IForm';
import { IFormSetting } from '../../../common/IFormSetting';

@Component({
  selector: 'cf-inputs-hidden',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.scss']
})
export class HiddenComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() propName: string;
  @Input() cfForm: IForm;
  @Input() cfFormSetting: IFormSetting;
  @Input() cfFormGroup: FormGroup;

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
