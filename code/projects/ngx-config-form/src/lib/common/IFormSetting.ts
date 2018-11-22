import { IConverter } from './IConverter';
import { IInputValidatorSetting } from './IInputValidatorSetting';

export interface IFormSetting {
  [propName: string]: {
    type: string;
    validators: IInputValidatorSetting;
    args: { [key: string]: any };
    converter?: IConverter;
    items: {
      name: string;
      validators: IInputValidatorSetting;
      args: { [key: string]: any };
      value: string;
    }[];
  };
}
