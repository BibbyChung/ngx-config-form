import { IConverter } from './IConverter';
import { IInputSettingValidator } from './IInputSettingValidator';

export interface IInputSetting {
  propName: string;
  type: string;
  validators: IInputSettingValidator;
  args: { [key: string]: any };
  converter?: IConverter;
  items: {
    name: string;
    validators: IInputSettingValidator;
    args: { [key: string]: any };
    value: string;
  }[];
}
