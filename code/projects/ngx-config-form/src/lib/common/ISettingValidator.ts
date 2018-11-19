import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export interface ISettingValidator {
  [key: string]: {
    validator: ValidatorFn | AsyncValidatorFn,
    msg: string,
    isPromiseOrObservable: boolean
  };
}
