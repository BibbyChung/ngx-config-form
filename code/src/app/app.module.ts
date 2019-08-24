import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { NgxConfigFormModule } from 'ngx-config-form';
import { NgxConfigFormModule } from '../../projects/ngx-config-form/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxConfigFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
