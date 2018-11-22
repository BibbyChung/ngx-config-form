import { OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IForm } from './IForm';
import { IInput } from './IInput';
import { IFormSetting } from './IFormSetting';

export abstract class BaseInput implements IInput, OnInit, OnDestroy {

  abstract propName: string;
  abstract cfFormSetting: IFormSetting;
  abstract cfFormGroup: FormGroup;

  protected groupElem: AbstractControl;
  protected elem: AbstractControl;

  private sbOb: Subscription;

  ObjectUtil = Object;

  constructor(protected host: IForm) { }

  abstract ngOnInit(): void;
  abstract ngOnDestroy(): void;

  protected superInit() {
    this.groupElem = this.cfFormGroup.get(this.propName);
    this.elem = this.cfFormGroup.get([this.propName, this.cfFormSetting[this.propName].items[0].name]);

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
      this.host.notifyValueChange(this.propName, v);
    });
  }
}
