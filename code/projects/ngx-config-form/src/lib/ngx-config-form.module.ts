import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import { CheckboxComponent } from './components/inputs/checkbox/checkbox.component';
import { ConfirmPasswordComponent } from './components/inputs/confirm-password/confirm-password.component';
import { HiddenComponent } from './components/inputs/hidden/hidden.component';
import { PasswordComponent } from './components/inputs/password/password.component';
import { RadioComponent } from './components/inputs/radio/radio.component';
import { TextComponent } from './components/inputs/text/text.component';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';

@NgModule({
  declarations: [
    ObjectKeysPipe,
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
export class NgxConfigFormModule { }
