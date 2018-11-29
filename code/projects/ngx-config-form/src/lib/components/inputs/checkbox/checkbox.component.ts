import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseInput } from '../../../common/baseInput';

@Component({
  selector: 'cf-inputs-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseInput implements OnInit, OnDestroy {

  @Input() propName: string;
  @Input() isMultiple = true;

  private defaultValue: string;
  private result: string[] = [];

  constructor() {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();
    this.cfForm.onReady().subscribe(() => {
      this.setData();
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  private setData() {
    if (this.elem.value) {
      this.result = this.elem.value.toString().split(',');
    }
    this.defaultValue = this.cfFormSetting[this.propName].items[0].value;
  }

  chagne(event: Event, cb, value) {
    event.preventDefault();
    event.stopPropagation();

    const index = this.result.indexOf(value);
    if (cb.checked && index === -1) {
      this.result.push(value);
    }
    if (!cb.checked && index !== -1) {
      this.result.splice(index, 1);
    }
    if (!this.isMultiple && cb.checked) {
      this.result = [];
      this.result.push(value);
    }
    if (this.result.length === 0) {
      this.result = this.defaultValue.split(',');
    }
    const v = this.result.filter(a => a).join(',');
    this.elem.setValue(v);
    this.elem.markAsDirty();
  }

}
