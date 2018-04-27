import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { map } from 'rxjs/operators';

import { Dog } from '../../models/dog.model';
import { Accessory } from '../../models/accessory.model';

@Component({
  selector: 'dog-form',
  styleUrls: ['dog-form.component.scss'],
  template: `
    <div class="dog-form">
      <form [formGroup]="form">
      
        <label>
          <h4>Doggo Name</h4>
          <input 
            type="text" 
            formControlName="name"
            placeholder="e.g. Cutest Pattootiest"
            class="dog-form__input"
            [class.error]="nameControlInvalid">
          <div
            class="dog-form__error"
            *ngIf="nameControlInvalid">
            <p>Must have a name</p>
          </div>
        </label>
      
        <ng-content></ng-content>

        <label>
          <h4>Select Accessories</h4>
        </label>
        <div class="dog-form__list">

          <dog-accessories
            [accessories]="accessories"
            formControlName="accessories">
          </dog-accessories>

        </div>

        <div class="dog-form__actions">
          <button
            type="button"
            class="btn btn__ok"
            *ngIf="!exists"
            (click)="createDog(form)">
            Create
          </button>

          <button
            type="button"
            class="btn btn__ok"
            *ngIf="exists"
            (click)="updateDog(form)">
            Save changes
          </button>

          <button
            type="button"
            class="btn btn__warning"
            *ngIf="exists"
            (click)="removeDog(form)">
            Delete
          </button>
        </div>

      </form>
    </div>
  `,
})
export class DogFormComponent implements OnChanges {
  exists = false;

  @Input() dog: Dog;
  @Input() accessories: Accessory[];

  @Output() selected = new EventEmitter<number[]>();
  @Output() create = new EventEmitter<Dog>();
  @Output() update = new EventEmitter<Dog>();
  @Output() remove = new EventEmitter<Dog>();

  form = this.fb.group({
    name: ['', Validators.required],
    accessories: [[]],
  });

  constructor(private fb: FormBuilder) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dog && this.dog.id) {
      this.exists = true;
      this.form.patchValue(this.dog);
    }
    this.form
      .get('accessories')
      .valueChanges.pipe(
        map(accessories => accessories.map((accessory: Accessory) => accessory.id))
      )
      .subscribe(value => this.selected.emit(value));
  }

  createDog(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateDog(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.dog, ...value });
    }
  }

  removeDog(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.dog, ...value });
  }
}
