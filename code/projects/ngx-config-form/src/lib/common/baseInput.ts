import { Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IErrorInfo } from './IErrorInfo';
import { IForm } from './IForm';
import { IFormSetting } from './IFormSetting';
import { IInput } from './IInput';
import { IInputValidatorSetting } from './IInputValidatorSetting';

export abstract class BaseInput implements IInput, OnInit, OnDestroy {

  abstract propName: string;

  _cfForm: IForm;
  @Input()
  set cfForm(v: IForm) {
    this._cfForm = v;
    this.cfFormSetting = v.cfFormSetting;
    this.cfFormGroup = v.cfFormGroup;
  }
  get cfForm() {
    return this._cfForm;
  }
  @Input() isShowErrorMsg = true;

  cfFormSetting: IFormSetting;
  cfFormGroup: FormGroup;

  protected groupElem: AbstractControl;
  protected elem: AbstractControl;
  protected elemValidators: IInputValidatorSetting;

  private sbObs: Subscription[] = [];

  ObjectUtil = Object;

  constructor() { }

  ngOnInit() {
    this.groupElem = this.cfFormGroup.get(this.propName);
    this.elem = this.cfFormGroup.get([this.propName, this.cfFormSetting[this.propName].items[0].name]);
    this.elemValidators = this.cfFormSetting[this.propName].items[0].validators;

    this.setNotify();
  }

  ngOnDestroy() {
    for (const ob of this.sbObs) {
      ob.unsubscribe();
    }
  }

  private setNotify(): any {
    const arr = [
      // set value
      this.elem.statusChanges
        .pipe(
          filter(a => a === 'VALID'),
        ).subscribe(a => {
          this.cfForm.notifyValueChange(this.propName, this.elem.value);
        }),
      // send error message
      this.elem.statusChanges
        .subscribe(a => {
          const isValid = a === 'VALID';
          const vKey = `${this.propName}_${this.cfFormSetting[this.propName].items[0].name}`;

          if (!isValid && this.elem.errors) {
            const errorInfo: IErrorInfo = {};
            for (const key of Object.keys(this.elem.errors)) {
              errorInfo[key] = {
                msg: this.elemValidators[key].msg,
                dirty: this.elem.dirty,
              };
            }
            this.cfForm.notifyValidatedInfo(vKey, false, errorInfo);
          }

          if (isValid) {
            this.cfForm.notifyValidatedInfo(vKey, true);
          }
        })
    ];
    this.sbObs.push(...arr);
  }
}
