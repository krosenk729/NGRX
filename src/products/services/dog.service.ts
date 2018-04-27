import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Dog } from '../models/dog.model';

@Injectable()
export class DogService {
  constructor(private http: HttpClient) {}

  getDog(): Observable<Dog[]> {
    return this.http
      .get<Dog[]>(`/api/dog`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createDog(payload: Dog): Observable<Dog> {
    return this.http
      .post<Dog>(`/api/dog`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateDog(payload: Dog): Observable<Dog> {
    return this.http
      .put<Dog>(`/api/dog/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeDog(payload: Dog): Observable<Dog> {
    return this.http
      .delete<any>(`/api/dog/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
