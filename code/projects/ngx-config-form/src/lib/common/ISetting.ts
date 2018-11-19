import { EnumSettingType } from './EnumSettingType';
import { IConvertor } from './IConvertor';
import { ISettingValidator } from './ISettingValidator';

export interface ISetting {
  propName: string;
  type: EnumSettingType | string;
  validators: ISettingValidator;
  args: { [key: string]: any };
  convertor?: IConvertor;
  items: {
    name: string;
    validators: ISettingValidator;
    args: { [key: string]: any };
    value: string;
  }[];
}
