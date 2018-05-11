import * as fromDogs from '../actions/dogs.action';
import { Dog } from '../../models/dog.model';

export interface DogState {
	data: Dog[],
	loaded: boolean,
	loading: boolean
}

export const initialState: DogState = {
	data: [
    {
      "id": 1,
      "name": "Selah",
      "image": "img/doggo/selah7.jpg",
      "accessories": [
        {
          "id": 7,
          "name": "glasses2"
        },
        {
          "id": 8,
          "name": "mustache1"
        }
      ]
    }
    ],
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

// selectors 
export const getDogsLoading = (state: DogState) => state.loading;
export const getDogsLoaded = (state: DogState) => state.loaded;
export const getDogs = (state: DogState) => state.data;