import * as fromDogs from '../actions/dogs.action';
import { Dog } from '../../models/dog.model';

export interface DogState {
	entities: { [id: number]: Dog },
	loaded: boolean,
	loading: boolean
}

export const initialState: DogState = {
	entities: {},
	loaded: false,
	loading: false
};


export function reducer(
	state = initialState,
	action: fromDogs.DogAction
	): DogState{

	switch(action.type){
		case fromDogs.LOAD_DOGS: {
			return {...state, loading: true}
		}
		case fromDogs.LOAD_DOGS_SUCCESS: {
			const dogs = action.payload;
			const entities = dogs.reduce(
				(entities, dog) => {
				return {...entities, [dog.id]: dog}
			}, {...state});
			
			return {...state, loading: false, loaded: true, entities}
		}
		case fromDogs.LOAD_DOGS_FAIL: {
			return {...state, loading: false, loaded: false}
		}
	}

	return state;
}

// exported functions for selectors 
export const getDogsEntities = (state: DogState) => state.entities;
export const getDogsLoading = (state: DogState) => state.loading;
export const getDogsLoaded = (state: DogState) => state.loaded;