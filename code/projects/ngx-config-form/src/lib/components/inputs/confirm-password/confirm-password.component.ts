import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseInput } from '../../../common/baseInput';
import { IInputValidatorSetting } from '../../../common/IInputValidatorSetting';

@Component({
  selector: 'cf-inputs-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})


export class ConfirmPasswordComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() propName: string;

  private ob: Subscription;
  private groupElemValidators: IInputValidatorSetting;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.groupElemValidators = this.cfFormSetting[this.propName].validators;

    this.setComponentNotify();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.ob.unsubscribe();
  }

  private setComponentNotify() {
    this.ob = this.groupElem.statusChanges
      .subscribe(a => {
        const isValid = a === 'VALID';
        const vKey = `${this.propName}_`;

        if (!isValid && this.groupElem.errors) {
          const errorObj = {};
          for (const key of Object.keys(this.groupElem.errors)) {
            errorObj[key] = {
              msg: this.groupElemValidators[key].msg,
              dirty: this.groupElem.dirty,
            };
          }
          this.cfForm.notifyValidatedInfo(vKey, false, errorObj);
        }

        if (isValid) {
          this.cfForm.notifyValidatedInfo(vKey, true);
        }
      });
  }

}
