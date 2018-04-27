import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';

import { Dog } from '../../models/dog.model';

export const DROP_ANIMATION = trigger('drop', [
  transition(':enter', [
    style({ transform: 'translateY(-200px)', opacity: 0 }),
    animate(
      '300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)', opacity: 1 }),
    animate(
      '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
      style({ transform: 'translateY(-200px)', opacity: 0 })
    ),
  ]),
]);

@Component({
  selector: 'dog-display',
  animations: [DROP_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['dog-display.component.scss'],
  template: `
    <div class="dog-display">
      <div class="dog-display__base">
        <img src="/assets/img/dog.svg">
        <img 
          *ngFor="let accessory of dog?.accessories; index as i;"
          src="/assets/img/accessories/{{ accessory.name }}.svg" 
          [style.zIndex]="i"
          class="dog-display__accessory"
          @drop>
      </div>
    </div>
  `,
})
export class DogDisplayComponent {
  @Input() dog: Dog;
}
