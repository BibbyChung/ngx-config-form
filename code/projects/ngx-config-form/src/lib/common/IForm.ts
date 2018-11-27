import { EventEmitter } from '@angular/core';

export interface IForm {
  onReady(): EventEmitter<void>;
  notifyValueChange(key: string, value: any);
}
