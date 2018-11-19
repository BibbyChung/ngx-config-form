import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxConfigFormModule } from 'ngx-config-form';
import { NgxConfigFormFakeModule } from './ngx-config-form-fake/ngx-config-form-fake.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxConfigFormModule,
    // NgxConfigFormFakeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
