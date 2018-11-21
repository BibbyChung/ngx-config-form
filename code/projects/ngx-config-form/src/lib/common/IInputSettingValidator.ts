import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export interface IInputSettingValidator {
  [key: string]: {
    validator: ValidatorFn | AsyncValidatorFn,
    msg: string,
    isPromiseOrObservable: boolean
  };
}
