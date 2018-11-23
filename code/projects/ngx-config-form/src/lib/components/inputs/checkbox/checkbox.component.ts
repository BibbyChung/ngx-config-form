import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseInput } from '../../../common/baseInput';
import { IForm } from '../../../common/IForm';
import { IFormSetting } from '../../../common/IFormSetting';

@Component({
  selector: 'cf-inputs-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() propName: string;
  @Input() cfForm: IForm;
  @Input() cfFormSetting: IFormSetting;
  @Input() cfFormGroup: FormGroup;

  private result: string[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.elem.value) {
      this.result = this.elem.value.toString().split(',');
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  chagne(event: Event, cb, value) {
    const index = this.result.indexOf(value);
    if (cb.checked && index === -1) {
      this.result.push(value);
    }
    if (!cb.checked && index !== -1) {
      this.result.splice(index, 1);
    }
    const v = this.result.filter(a => a).join(',');
    this.elem.setValue(v);
    this.elem.markAsDirty();
  }

}
