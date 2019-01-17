import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IErrorInfo } from './IErrorInfo';
import { IFormSetting } from './IFormSetting';

export interface IForm {
  cfFormSetting: IFormSetting;
  cfFormGroup: FormGroup;
  onReady(): EventEmitter<void>;
  notifyValueChange(key: string, value: any);
  notifyValidatedInfo(key: string, isValid: boolean, info?: IErrorInfo);
}
