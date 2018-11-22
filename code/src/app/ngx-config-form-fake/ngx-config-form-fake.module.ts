import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from '../../../projects/ngx-config-form/src/lib/components/button/button.component';
import { FormComponent } from '../../../projects/ngx-config-form/src/lib/components/form/form.component';
import { CheckboxComponent } from '../../../projects/ngx-config-form/src/lib/components/inputs/checkbox/checkbox.component';
import { ConfirmPasswordComponent } from '../../../projects/ngx-config-form/src/lib/components/inputs/confirm-password/confirm-password.component';
import { HiddenComponent } from '../../../projects/ngx-config-form/src/lib/components/inputs/hidden/hidden.component';
import { PasswordComponent } from '../../../projects/ngx-config-form/src/lib/components/inputs/password/password.component';
import { RadioComponent } from '../../../projects/ngx-config-form/src/lib/components/inputs/radio/radio.component';
import { TextComponent } from '../../../projects/ngx-config-form/src/lib/components/inputs/text/text.component';

@NgModule({
  declarations: [
    CheckboxComponent,
    ConfirmPasswordComponent,
    HiddenComponent,
    PasswordComponent,
    RadioComponent,
    TextComponent,
    ButtonComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CheckboxComponent,
    ConfirmPasswordComponent,
    HiddenComponent,
    PasswordComponent,
    RadioComponent,
    TextComponent,
    ButtonComponent,
    FormComponent
  ]
})
export class NgxConfigFormFakeModule { }

export * from '../../../projects/ngx-config-form/src/lib/common/IConverter';
export * from '../../../projects/ngx-config-form/src/lib/common/IFormSetting';
export * from '../../../projects/ngx-config-form/src/lib/validators/cfValidator';

