import { Action } from '@ngrx/store';

// load dogs
// if fail, dispatch fail
// if success, dispatch success
export const LOAD_DOGS = '[Products] Load Dogs';
export const LOAD_DOGS_Fail = '[Products] Load Dogs Fail';
export const LOAD_DOGS_Success = '[Products] Load Dogs Success';

// action creators
export class LoadDogs implements Action{
	readonly type = LOAD_DOGS;
}