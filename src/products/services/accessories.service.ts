import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Accessory } from '../models/accessory.model';

@Injectable()
export class AccessoriesService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Accessory[]> {
    return this.http
      .get<Accessory[]>(`/api/accessories`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
