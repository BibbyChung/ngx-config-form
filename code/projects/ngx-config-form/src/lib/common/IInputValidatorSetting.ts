import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export interface IInputValidatorSetting {
  [key: string]: {
    validator: ValidatorFn | AsyncValidatorFn,
    msg: string,
    isPromiseOrObservable: boolean
  };
}
