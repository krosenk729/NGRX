import { Action } from '@ngrx/store';
import { Dog } from '../../models/dog.model';

// load dogs
// if fail, dispatch fail
// if success, dispatch success
// Bracket notation is adding namespaces 
export const LOAD_DOGS = '[Products] Load Dogs';
export const LOAD_DOGS_FAIL = '[Products] Load Dogs Fail';
export const LOAD_DOGS_SUCCESS = '[Products] Load Dogs Success';

// action creators
export class LoadDogs implements Action{
	readonly type = LOAD_DOGS;
}

export class LoadDogsFail implements Action{
	readonly type = LOAD_DOGS_FAIL;
	constructor(public payload: any){}
}

export class LoadDogsSuccess implements Action{
	readonly type = LOAD_DOGS_SUCCESS;
	constructor(public payload: Dog[]){}
}

// export action types
// for use in reducers

export type DogAction = LoadDogs | LoadDogsFail | LoadDogsSuccess;