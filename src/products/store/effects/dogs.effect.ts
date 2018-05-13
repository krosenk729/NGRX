import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
// actions are observable -- so we can listen for them and respond

import * as dogActions from '../actions/dogs.action';

@Injectable()
export class DogsEffects {
	constructor(private actions$: Actions){	}
	
	// observable stream 
	loadDogs$ = this.actions$.ofType(dogActions.LOAD_DOGS)
		.map()
		.filter();
}