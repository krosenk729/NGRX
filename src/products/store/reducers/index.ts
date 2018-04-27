import { ActionReducerMap } from '@ngrx/store';
import * as fromDogs from './dogs.reducer';

// slice of state
export interface ProductsState{
	dogs: fromDogs.DogState
}

// slice of state managed by reducer function
export const reducers: ActionReducerMap<ProductsState> = {
	dogs: fromDogs.reducer
};;