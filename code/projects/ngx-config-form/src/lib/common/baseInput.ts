import { OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IForm } from './IForm';
import { IInput } from './IInput';
import { ISetting } from './ISetting';

export abstract class BaseInput implements IInput, OnInit, OnDestroy {

  abstract dfFormGroup: FormGroup;
  abstract setting: ISetting;

  protected groupElem: AbstractControl;
  protected elem: AbstractControl;

  private sbOb: Subscription;
  constructor(protected host: IForm) { }

  abstract ngOnInit(): void;
  abstract ngOnDestroy(): void;

  protected superInit() {
    this.groupElem = this.dfFormGroup.get(this.setting.propName);
    this.elem = this.dfFormGroup.get([this.setting.propName, this.setting.items[0].name]);

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
      this.host.notifyValueChange(this.setting.propName, v);
    });
  }
}
