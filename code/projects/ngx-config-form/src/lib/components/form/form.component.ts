import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AsyncValidatorFn, ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IErrorInfo } from '../../common/IErrorInfo';
import { IForm } from '../../common/IForm';
import { IFormSetting } from '../../common/IFormSetting';
import { IInputValidatorSetting } from '../../common/IInputValidatorSetting';

const USER_PROFILE_VALUE_ACCESSOR: any = {
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
  private errorPropName = '_errMsg_';

  @Input() autocomplete: 'on' | 'off' = 'off';
  @Input() cfFormSetting: IFormSetting = {};
  @Input() cfFormGroup: FormGroup;
  @Input() formClass = '';
  @Input() isDebug = false;

  @Output() cfFormReady = new EventEmitter<void>();

  private onChange: (value) => {};
  private onTouched: (value) => {};

  private data: object;
  data$ = new BehaviorSubject(this.data);

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
    this.setFormGroupValue();
    this.setReady();
  }
  private setReady(): any {
    this.isReady = true;
    this.cfFormReady.emit();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  notifyValueChange(key: string, value: any) {
    if (!this.onChange) {
      return;
    }

    let v = value;
    const setting = this.cfFormSetting[key];
    if (setting.converter) {
      v = setting.converter.from(value);
    }
    this.data[key] = v;

    this.data$.next(this.data);
    this.onChange(this.data);
  }

  notifyValidatedInfo(key: string, isValid: boolean, info?: IErrorInfo) {
    if (!this.onChange) {
      return;
    }

    if (isValid) {
      const obj = this.data[this.errorPropName] || {};
      delete obj[key];
      this.data[this.errorPropName] = obj;
    } else {
      const obj = this.data[this.errorPropName] || {};
      const oErrorObj = obj[key] || {};
      obj[key] = info;
      this.data[this.errorPropName] = obj;
    }

    this.onChange(this.data);
  }

  onReady(): EventEmitter<void> {
    return this.cfFormReady;
  }

  private initFormGroupSetting() {
    for (const propName of Object.keys(this.cfFormSetting)) {
      const setting = this.cfFormSetting[propName];
      const g = {};
      for (const item of setting.items) {
        const itemValidatorInfo = this.getValidators(item.validators);
        g[item.name] = ['', itemValidatorInfo.validatorFns, itemValidatorInfo.asyncValidatorFns];
      }
      const fbG = this.fb.group(g);
      const groupValidatorInfo = this.getValidators(setting.validators);
      fbG.setValidators(groupValidatorInfo.validatorFns);
      fbG.setAsyncValidators(groupValidatorInfo.asyncValidatorFns);
      this.cfFormGroup.setControl(propName, fbG);
    }
  }

  private setFormGroupValue() {
    for (const propName of Object.keys(this.cfFormSetting)) {
      const setting = this.cfFormSetting[propName];
      for (const item of setting.items) {
        let value = this.data[item.name] || item.value || '';
        if (setting.converter) {
          value = setting.converter.to(value);
        }
        const c = this.cfFormGroup.get([propName, item.name]);
        c.setValue(value);
      }
    }
  }

  private getValidators(validators: IInputValidatorSetting) {
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
