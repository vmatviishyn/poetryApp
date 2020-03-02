import { Action } from '@ngrx/store';
import { Poem } from '../../models/poem.model';

export const GET_POEMS = '[Poems] Get Poems';
export const GET_POEMS_SUCCESS = '[Poems] Get Poems Success';
export const GET_POEMS_FAIL = '[Poems] Get Poems Fail';


// GET_POEMS
export class GetPoems implements Action {
  readonly type = GET_POEMS;
}

export class GetPoemsSuccess implements Action {
  readonly type = GET_POEMS_SUCCESS;
  constructor(public payload: Poem[]) { }
}

export class GetPoemsFail implements Action {
  readonly type = GET_POEMS_FAIL;
  constructor(public payload: any) { }
}

export type PoemsAction =
  | GetPoems
  | GetPoemsSuccess
  | GetPoemsFail;
