import { FormGroup } from '@angular/forms';
import { IFormSetting } from './IFormSetting';

export interface IInput {
  cfFormGroup: FormGroup;
  cfFormSetting: IFormSetting;
}
