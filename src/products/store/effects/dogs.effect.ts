import { Injectable } from '@angular/core';
// actions are observable -- so we can listen for them and respond
import { Effect, Actions } from '@ngrx/effects';
// switchMap allows us to return a new action after mapping/reducing
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromServices from '../../services';
import * as dogActions from '../actions/dogs.action';

@Injectable()
export class DogsEffects {
	constructor(
		private actions$: Actions, 
		private dogService: fromServices.DogService
		){}
	
	// observable stream 
	// @Effect decorator means we can listen to effect of actions
	// use pipe on observables to manipulate data
	@Effect()
	loadDogs$ = this.actions$.ofType(dogActions.LOAD_DOGS)
		.pipe(
			switchMap(()=>{
				return this.dogService.getDog().pipe(
					map(dogs => new dogActions.LoadDogsSuccess(dogs)),
					// use 'of' to export as variable 
					catchError(error => of(new dogActions.LoadDogsFail(error)))
					);
			})
		);
}