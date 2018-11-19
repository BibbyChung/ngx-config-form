import { AbstractControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

// @dynamic
export class DfValidator {

  static confirmPassword(passwordName: string, confirmPasswordName: string): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (!c.dirty) {
        return null;
      }

      const password = c.get(passwordName);
      const confirmPassword = c.get(confirmPasswordName);
      if (password.value === confirmPassword.value) {
        return null;
      }

      const errObj = { confirmPassword: true };
      return errObj;
    };
  }

  static groupRequired(...childrenNames: string[]): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (!c.dirty) {
        return null;
      }

      const arr = [];
      for (const name of childrenNames) {
        arr.push(c.get(name));
      }

      const emptyElemCount = arr.filter(a => !a.value).length;
      if (emptyElemCount === 0) {
        return null;
      }

      const errObj = { groupRequired: true };
      return errObj;
    };
  }

  static pattern(errClassName: string, pattern: string) {
    return (c: AbstractControl) => {
      if (!c.dirty) {
        return null;
      }
      if (!c.value) {
        return null;
      }
      const re = new RegExp(pattern);
      const isValid = re.test(c.value);
      if (isValid) {
        return null;
      }
      const errObj = {};
      errObj[errClassName] = true;
      return errObj;
    };
  }

  static AsyncValidate(errClassName: string, debounce: number, fn: (v: any) => Promise<boolean>) {
    return (c: AbstractControl) => {
      if (!c.dirty) {
        return of(null);
      }
      const $ob = c.valueChanges.pipe(
        debounceTime(debounce),
        switchMap(async v => await fn(v)),
        map(isValid => {
          if (isValid) {
            return null;
          }
          const errObj = {};
          errObj[errClassName] = true;
          return errObj;
        }),
        first()
      );
      return $ob;
    };
  }

}
