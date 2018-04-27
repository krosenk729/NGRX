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
	action: fromDogs.DogActions
	): DogState{

	return state;
}