import { FormGroup, FormControl } from '@angular/forms';

export class Utils {

  static getErrorMsgs(info: object) {
    const obj = info['_errMsg_'];
    const arr = [];
    if (obj) {
      Object.keys(obj).forEach(prop => {
        Object.keys(obj[prop]).forEach(propChild => {
          const item = obj[prop][propChild];
          if (item.dirty) {
            arr.push(item['msg']);
          }
        });
      });
    }
    return arr;
  }

  static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      } else if (control instanceof FormGroup) {
        Utils.validateAllFormFields(control);
      }
    });
  }

}
