import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import { CheckboxComponent } from './components/inputs/checkbox/checkbox.component';
import { ConfirmPasswordComponent } from './components/inputs/confirm-password/confirm-password.component';
import { HiddenComponent } from './components/inputs/hidden/hidden.component';
import { RadioComponent } from './components/inputs/radio/radio.component';
import { TextComponent } from './components/inputs/text/text.component';
import { TextareaComponent } from './components/inputs/textarea/textarea.component';

@NgModule({
  declarations: [
    CheckboxComponent,
    ConfirmPasswordComponent,
    HiddenComponent,
    RadioComponent,
    TextComponent,
    TextareaComponent,
    ButtonComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CheckboxComponent,
    ConfirmPasswordComponent,
    HiddenComponent,
    RadioComponent,
    TextComponent,
    TextareaComponent,
    ButtonComponent,
    FormComponent
  ]
})
export class NgxConfigFormModule { }
