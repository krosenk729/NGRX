import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Dog } from '../../models/dog.model';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((dogs$ | async)?.length)">
          No doggos, add one to get started.
        </div>
        <dog-item
          *ngFor="let dog of (dogs$ | async)"
          [dog]="dog">
        </dog-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  dogs$: Observable<Dog[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.dogs$ = this.store.select(fromStore.getDogsAll);
  }
}
