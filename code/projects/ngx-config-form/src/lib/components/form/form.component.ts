import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AsyncValidatorFn, ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { IForm } from '../../common/IForm';
import { IInputSetting } from '../../common/IInputSetting';
import { IInputSettingValidator } from '../../common/IInputSettingValidator';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormComponent),
  multi: true
};

@Component({
  selector: 'cf-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [USER_PROFILE_VALUE_ACCESSOR]
})
export class FormComponent implements ControlValueAccessor, OnInit, IForm {

  isReady = false;

  onChange: (value) => {};
  onTouched: () => {};

  // private originObj = {};

  @Input() cfInputSettings: IInputSetting[] = [];
  @Input() cfFormGroup: FormGroup;
  @Input() class = '';
  @Input() isDebug = false;

  private data: object;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initFormGroupSetting();

  }

  writeValue(originObj: object): void {
    if (!originObj) {
      return;
    }
    this.data = originObj;
    this.isReady = true;
    this.setFormGroupValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  notifyValueChange(key: string, value: any) {
    if (!this.onChange) {
      return;
    }

    let v = value;
    const setting = this.cfInputSettings.filter(a => a.propName === key)[0];
    if (setting.converter) {
      v = setting.converter.out(value);
    }

    this.data[key] = v;
    this.onChange(this.data);
  }

  private initFormGroupSetting() {
    for (const setting of this.cfInputSettings) {
      const g = {};
      for (const item of setting.items) {
        const itemValidatorInfo = this.getValidators(item.validators);
        g[item.name] = ['', itemValidatorInfo.validatorFns, itemValidatorInfo.asyncValidatorFns];
      }
      const fbG = this.fb.group(g);
      const groupValidatorInfo = this.getValidators(setting.validators);
      fbG.setValidators(groupValidatorInfo.validatorFns);
      fbG.setAsyncValidators(groupValidatorInfo.asyncValidatorFns);
      this.cfFormGroup.setControl(setting.propName, fbG);
    }
  }

  private setFormGroupValue() {
    for (const setting of this.cfInputSettings) {
      for (const item of setting.items) {
        let value = this.data[item.name] || item.value || '';
        if (setting.converter) {
          value = setting.converter.in(value);
        }
        const c = this.cfFormGroup.get([setting.propName, item.name]);
        c.setValue(value);
      }
    }
  }

  private getValidators(validators: IInputSettingValidator) {
    const validatorFns: ValidatorFn[] = [];
    const asyncValidatorFns: AsyncValidatorFn[] = [];
    for (const key of Object.keys(validators)) {
      const v = validators[key];
      if (v.isPromiseOrObservable) {
        asyncValidatorFns.push(v.validator as AsyncValidatorFn);
      } else {
        validatorFns.push(v.validator as ValidatorFn);
      }
    }
    return { validatorFns, asyncValidatorFns };
  }

}
