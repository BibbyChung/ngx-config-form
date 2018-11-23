import { OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IForm } from './IForm';
import { IFormSetting } from './IFormSetting';
import { IInput } from './IInput';

export abstract class BaseInput implements IInput, OnInit, OnDestroy {

  abstract propName: string;
  abstract cfForm: IForm;
  abstract cfFormSetting: IFormSetting;
  abstract cfFormGroup: FormGroup;

  protected groupElem: AbstractControl;
  protected elem: AbstractControl;

  private sbOb: Subscription;

  ObjectUtil = Object;

  constructor() { }

  ngOnInit() {
    this.groupElem = this.cfFormGroup.get(this.propName);
    this.elem = this.cfFormGroup.get([this.propName, this.cfFormSetting[this.propName].items[0].name]);

    this.setNotify();
  }

  ngOnDestroy() {
    if (!this.sbOb) {
      return;
    }
    this.sbOb.unsubscribe();
  }

  private setNotify(): any {
    this.sbOb = this.elem.statusChanges.pipe(
      filter(a => a === 'VALID'),
    ).subscribe(a => {
      this.cfForm.notifyValueChange(this.propName, this.elem.value);
    });
  }
}
