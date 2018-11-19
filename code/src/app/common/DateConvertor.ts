import { IConvertor } from 'ngx-config-form';
// import { IConvertor } from '../ngx-config-form-fake/ngx-config-form-fake.module';

export class DateConvertor implements IConvertor {
  private operator0 = '-';
  private operator1 = '/';
  in(v: string, args?: any) {
    const r = new RegExp(this.operator1, 'g');
    return `${v}`.replace(r, this.operator0);
  }
  out(v: string, args?: any) {
    const r = new RegExp(this.operator0, 'g');
    return v.replace(r, this.operator1);
  }
}
