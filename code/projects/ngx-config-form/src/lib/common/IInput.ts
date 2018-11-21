import { FormGroup } from '@angular/forms';
import { IInputSetting } from './IInputSetting';

export interface IInput {
  cfFormGroup: FormGroup;
  inputSetting: IInputSetting;
}
