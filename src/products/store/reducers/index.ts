import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromDogs from './dogs.reducer';

// slice of state
export interface ProductsState{
	dogs: fromDogs.DogState
}

// slice of state managed by reducer function
export const reducers: ActionReducerMap<ProductsState> = {
	dogs: fromDogs.reducer
};

// selectors 
// 'products' matches what was passed in forRoot of ngmodule 
export const getProductState = createFeatureSelector<ProductsState>(
	'products'
);

// dog state 
export const getDogState = createSelector(
	getProductState, 
	(state: ProductsState) => state.dogs
);

