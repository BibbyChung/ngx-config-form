import { OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IForm } from './IForm';
import { IInput } from './IInput';
import { IInputSetting } from './IInputSetting';

export abstract class BaseInput implements IInput, OnInit, OnDestroy {

  abstract cfFormGroup: FormGroup;
  abstract inputSetting: IInputSetting;

  protected groupElem: AbstractControl;
  protected elem: AbstractControl;

  private sbOb: Subscription;
  constructor(protected host: IForm) { }

  abstract ngOnInit(): void;
  abstract ngOnDestroy(): void;

  protected superInit() {
    this.groupElem = this.cfFormGroup.get(this.inputSetting.propName);
    this.elem = this.cfFormGroup.get([this.inputSetting.propName, this.inputSetting.items[0].name]);

    this.setNotify();
  }

  protected superDestroy() {
    if (!this.sbOb) {
      return;
    }
    this.sbOb.unsubscribe();
  }

  private setNotify(): any {
    this.sbOb = this.elem.valueChanges.subscribe(v => {
      this.host.notifyValueChange(this.inputSetting.propName, v);
    });
  }
}
