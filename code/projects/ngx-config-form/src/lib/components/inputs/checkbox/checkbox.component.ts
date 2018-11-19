import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseInput } from '../../../common/baseInput';
import { IForm } from '../../../common/IForm';
import { ISetting } from '../../../common/ISetting';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'cf-inputs-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() dfFormGroup: FormGroup;
  @Input() setting: ISetting;

  private result: string[] = [];

  constructor(
    @Inject(forwardRef(() => FormComponent)) host: IForm
  ) {
    super(host);
  }

  ngOnInit() {
    super.superInit();
    if (this.elem.value) {
      this.result = this.elem.value.toString().split(',');
    }
  }

  ngOnDestroy(): void {
    this.superDestroy();
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
