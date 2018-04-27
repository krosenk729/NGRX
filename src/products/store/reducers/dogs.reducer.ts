import * as fromDogs from '../actions/dogs.action';
import { Dog } from '../../models/dog.model';

export interface DogState {
	data: Dog[],
	loaded: boolean,
	loading: boolean
}

export const initialState: DogState = {
	data: [],
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
			return {...state, loading: false, loaded: true}
		}
		case fromDogs.LOAD_DOGS_FAIL: {
			return {...state, loading: false, loaded: false}
		}
	}

	return state;
}