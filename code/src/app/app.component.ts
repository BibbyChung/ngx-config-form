import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CfValidator, IInputSetting, IConverter } from './ngx-config-form-fake/ngx-config-form-fake.module';
import { CfValidator, IInputSetting, IConverter } from 'ngx-config-form';

class DateConverter implements IConverter {
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ngx-config-form-app';

  set infoJson(v: string) {
    try {
      this.info = JSON.parse(v);
    } catch (err) { }
  }
  get infoJson() {
    return JSON.stringify(this.info);
  }

  info = {
    id: 666,
    title: 'oo',
    date: '2018/10/11',
    sex: 'female',
    productions: 'windows,android',
    pwd: '',
    password: ''
  };

  cfFormGroup: FormGroup;
  cfInputSettings: IInputSetting[];

  constructor(private fb: FormBuilder) {
    this.cfFormGroup = this.fb.group({});
    this.init();
  }

  init(): any {
    this.cfInputSettings = [
      {
        propName: 'id',
        type: 'hidden',
        validators: {},
        args: {},
        items: [
          {
            name: 'id',
            value: '0',
            validators: {},
            args: {}
          }
        ]
      },
      {
        propName: 'title',
        type: 'text',
        validators: {},
        args: {},
        items: [
          {
            name: 'title',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: '請輸入名稱'
              },
              'maxlength': {
                validator: Validators.maxLength(10),
                isPromiseOrObservable: false,
                msg: '不大於10字元'
              },
              'minlength': {
                validator: Validators.minLength(2),
                isPromiseOrObservable: false,
                msg: '不小於2字元'
              },
              'mypattern': {
                validator: CfValidator.pattern('mypattern', '^oo$'),
                msg: 'my pattern is oo',
                isPromiseOrObservable: false
              },
              'asyncV0': {
                validator: CfValidator.AsyncValidate('asyncV0', 400, v => {
                  return new Promise<boolean>((resolve, reject) => {
                    setTimeout(() => {
                      if (v === '1234') {
                        resolve(false);
                      }
                      resolve(true);
                    }, 800);
                  });
                }),
                msg: 'async 不能使用 1234',
                isPromiseOrObservable: true
              },
              'asyncV1': {
                validator: CfValidator.AsyncValidate('asyncV1', 400, v => {
                  return new Promise<boolean>((resolve, reject) => {
                    setTimeout(() => {
                      if (v === '12345') {
                        resolve(false);
                      }
                      resolve(true);
                    }, 800);
                  });
                }),
                msg: 'async 不能使用 12345',
                isPromiseOrObservable: true
              },
            },
            args: {
              alias: '名稱',
              placeholder: '名稱',
              murmur: '這是名稱'
            }
          }
        ]
      },
      {
        propName: 'date',
        type: 'text',
        validators: {},
        args: {},
        converter: new DateConverter(),
        items: [
          {
            name: 'date',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: '請輸入時間'
              },
              'pattern': {
                validator: Validators.pattern(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/),
                isPromiseOrObservable: false,
                msg: '時間格式錯誤'
              },
            },
            args: {
              alias: '時間',
              placeholder: '',
              murmur: 'ex: 2018-01-01'
            }
          }
        ]
      },
      {
        propName: 'sex',
        type: 'radio',
        validators: {},
        args: {},
        items: [
          {
            name: 'sex',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: '您的性別未填入'
              }
            },
            args: {
              alias: '性別',
              murmur: '請填入您的性別',
              radios: [
                { value: 'male', text: '男' },
                { value: 'female', text: '女' }
              ]
            }
          }]
      },
      {
        propName: 'productions',
        type: 'checkbox',
        validators: {},
        args: {},
        items: [
          {
            name: 'productions',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: '必須輸入您的產品'
              }
            },
            args: {
              alias: '產品',
              murmur: '請輸入您喜歡的產品',
              checkboxs: [
                { value: 'ios', text: '蘋果' },
                { value: 'android', text: 'android' },
                { value: 'windows', text: '微軟' }]
            }
          }]
      },
      {
        propName: 'pwd',
        type: 'password',
        validators: {},
        args: {},
        items: [
          {
            name: 'pwd',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: '請輸入密碼'
              }
            },
            args: {
              alias: '密碼',
              placeholder: '密碼',
              murmur: '輸入密碼'
            }
          }
        ]
      },
      {
        propName: 'password',
        type: 'confirmPassword',
        validators: {
          'confirmPassword': {
            validator: CfValidator.confirmPassword('password_source', 'password_confirm'),
            isPromiseOrObservable: false,
            msg: 'The password is not the same.'
          }
        },
        args: {},
        items: [
          {
            name: 'password_source',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: 'please input your password'
              }
            },
            args: {
              alias: '密碼',
              placeholder: 'Password',
              murmur: '',
            }
          },
          {
            name: 'password_confirm',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: 'please input your password again'
              }
            },
            args: {
              alias: '確認密碼',
              placeholder: 'Confirm Password',
              murmur: '',
            }
          }
        ]
      }
    ];
  }

  gogogo($event) {
    console.log('gogogog...');
  }
}
