import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Dog } from '../../models/dog.model';
import { DogService } from '../../services/dog.service';

import { Accessory } from '../../models/accessory.model';
import { AccessoriesService } from '../../services/accessories.service';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <dog-form
        [dog]="dog"
        [accessories]="accessories"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <dog-display
          [dog]="visualise">
        </dog-display>
      </dog-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  dog: Dog;
  visualise: Dog;
  accessories: Accessory[];

  constructor(
    private dogService: DogService,
    private accessoriesService: AccessoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.dogService.getDog().subscribe(dogs => {
      const param = this.route.snapshot.params.id;
      let dog;
      if (param === 'new') {
        dog = {};
      } else {
        dog = dogs.find(dog => dog.id == parseInt(param, 10));
      }
      this.dog = dog;
      this.accessoriesService.getAccessories().subscribe(accessories => {
        this.accessories = accessories;
        this.onSelect(accessories.map(accessory => accessory.id));
      });
    });
  }

  onSelect(event: number[]) {
    let accessories;
    if (this.accessories && this.accessories.length) {
      accessories = event.map(id =>
        this.accessories.find(accessory => accessory.id === id)
      );
    } else {
      accessories = this.dog.accessories;
    }
    this.visualise = { ...this.dog, accessories };
  }

  onCreate(event: Dog) {
    this.dogService.createDog(event).subscribe(dog => {
      this.router.navigate([`/products/${dog.id}`]);
    });
  }

  onUpdate(event: Dog) {
    this.dogService.updateDog(event).subscribe(() => {
      this.router.navigate([`/products`]);
    });
  }

  onRemove(event: Dog) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.dogService.removeDog(event).subscribe(() => {
        this.router.navigate([`/products`]);
      });
    }
  }
}
