import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'dog-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['dog-item.component.scss'],
  template: `
    <div class="dog-item">
      <a [routerLink]="['/products', dog.id]">
        <dog-display
          [dog]="dog">
        </dog-display>
        <h4>{{ dog.name }}</h4>
        <button type="button" class="btn btn__ok">
          View dog
        </button>
      </a>
    </div>
  `,
})
export class DogItemComponent {
  @Input() dog: any;
}
