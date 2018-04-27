import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Dog } from '../../models/dog.model';
import { DogService } from '../../services/dog.service';

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
        <div *ngIf="!((dogs)?.length)">
          No doggos, add one to get started.
        </div>
        <dog-item
          *ngFor="let dog of (dogs)"
          [dog]="dog">
        </dog-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  dogs: Dog[];

  constructor(private dogService: DogService) {}

  ngOnInit() {
    this.dogService.getDog().subscribe(dogs => {
      this.dogs = dogs;
    });
  }
}
