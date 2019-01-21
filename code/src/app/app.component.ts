import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CfValidators, IFormSetting, IConverter } from './ngx-config-form-fake/ngx-config-form-fake.module';
// import { CfValidator, IFormSetting, IConverter, IErrorInfo } from 'ngx-config-form';

class DateConverter implements IConverter {
  private operator0 = '-';
  private operator1 = '/';
  to(v: string, args?: any) {
    const r = new RegExp(this.operator1, 'g');
    return `${v}`.replace(r, this.operator0);
  }
  from(v: string, args?: any) {
    const r = new RegExp(this.operator0, 'g');
    return v.replace(r, this.operator1);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ngx-config-form-app';

  set infoJson(v: string) {
    try {
      this.info = JSON.parse(v);
    } catch (err) { }
  }
  get infoJson() {
    return JSON.stringify(this.info);
  }

  ObjectUtil = Object;

  info = {};
  cfFormGroup: FormGroup;
  cfFormSetting: IFormSetting;

  constructor(private fb: FormBuilder) {
    this.cfFormGroup = this.fb.group({});
    this.setSetting();
  }

  get errorMsg() {
    const obj = this.info['_errMsg_'];
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

  ngOnInit(): void {
    this.setData(null);
  }

  commitIt(event: Event) {
    console.log(this.info);
    this.cfFormGroup.reset();
    this.setData(null);
    console.log('done...');
  }

  setData(event: Event) {
    if (event) {
      event.preventDefault();
    }

    this.info = {
      id: 666,
      title: 'oo',
      description: 'dd',
      date: '2018/10/11',
      sex: 'female',
      productions: 'android,windows',
      pwd: '',
      password: ''
    };

    console.log('reset...');
  }

  private setSetting(): any {
    this.cfFormSetting = {
      id: {
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
      title: {
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
                validator: CfValidators.pattern('mypattern', /^oo$/),
                msg: 'my pattern is oo',
                isPromiseOrObservable: false
              },
              'asyncV0': {
                validator: CfValidators.AsyncValidate('asyncV0', 400, v => {
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
                validator: CfValidators.AsyncValidate('asyncV1', 400, v => {
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
      oooo: {
        type: 'text',
        validators: {},
        args: {},
        items: [
          {
            name: 'oooo',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: '請輸入帳號'
              },
              'mypattern1': {
                validator: CfValidators.pattern('mypattern1', /1/),
                msg: '要輸入1才可以',
                isPromiseOrObservable: false
              },
              'mypattern2': {
                validator: CfValidators.pattern('mypattern2', /^[\da-zA-Z]{5,10}$/),
                msg: '^[\da-zA-Z]{5,10}$',
                isPromiseOrObservable: false
              },
            },
            args: {
              alias: '帳號',
              placeholder: '请输入您的帳號',
              murmur: ''
            }
          }
        ]
      },
      city: {
        type: 'select',
        validators: {},
        args: {},
        items: [
          {
            name: 'city',
            value: 'shanghai',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: '您的城市未填入'
              }
            },
            args: {
              alias: '城市',
              murmur: '請填入您的城市',
              options: [
                { value: '', text: '請選擇..' },
                { value: 'taipei', text: '台北' },
                { value: 'shanghai', text: '上海' }
              ]
            }
          }]
      },
      description: {
        type: 'textarea',
        validators: {},
        args: {},
        items: [
          {
            name: 'description',
            value: '',
            validators: {
              'required': {
                validator: Validators.required,
                isPromiseOrObservable: false,
                msg: '請輸入描述'
              }
            },
            args: {
              alias: '描述',
              placeholder: '描述',
              murmur: '這是描述'
            }
          }
        ]
      },
      date: {
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
      sex: {
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
              options: [
                { value: 'male', text: '男' },
                { value: 'female', text: '女' }
              ]
            }
          }]
      },
      productions: {
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
              options: [
                { value: 'ios', text: '蘋果' },
                { value: 'android', text: 'android' },
                { value: 'windows', text: '微軟' }
              ]
            }
          }]
      },
      pwd: {
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
      password: {
        type: 'confirmPassword',
        validators: {
          'confirmPassword': {
            validator: CfValidators.confirmPassword('password_source', 'password_confirm'),
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
    };
  }
}
