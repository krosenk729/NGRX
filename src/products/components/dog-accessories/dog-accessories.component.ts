import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Accessory } from '../../models/accessory.model';

const DOG_ACCESSoRIES_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DogAccessoriesComponent),
  multi: true,
};

@Component({
  selector: 'dog-accessories',
  providers: [DOG_ACCESSoRIES_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['dog-accessories.component.scss'],
  template: `
    <div class="dog-accessories">
      <div 
        class="dog-accessories-item"
        *ngFor="let accessory of accessories;"
        (click)="selectAccessory(accessory)"
        [class.active]="existsInAccessories(accessory)">
        <img src="/assets/img/accessories/singles/{{ accessory.name }}.svg">
        {{ accessory.name }}
      </div>
    </div>
  `,
})
export class DogAccessoriesComponent implements ControlValueAccessor {
  @Input() accessories: Accessory[] = [];

  value: Accessory[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: Accessory[]) {
    this.value = value;
  }

  selectAccessory(accessory: Accessory) {
    if (this.existsInAccessories(accessory)) {
      this.value = this.value.filter(item => item.id !== accessory.id);
    } else {
      this.value = [...this.value, accessory];
    }
    this.onTouch();
    this.onModelChange(this.value);
  }

  existsInAccessories(accessory: Accessory) {
    return this.value.some(val => val.id === accessory.id);
  }
}
