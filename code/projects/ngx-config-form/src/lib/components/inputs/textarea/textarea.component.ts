import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseInput } from '../../../common/baseInput';
import { IForm } from '../../../common/IForm';
import { IFormSetting } from '../../../common/IFormSetting';

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
