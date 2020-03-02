import { Action } from '@ngrx/store';
import { Poem } from '../../models/poem.model';
import { Like } from '../../models/like.model';
import { Comment } from '../../models/comment.model';


export const GET_POEMS = '[Poems] Get Poems';
export const GET_POEMS_SUCCESS = '[Poems] Get Poems Success';
export const GET_POEMS_FAIL = '[Poems] Get Poems Fail';

export const GET_POEM_LIKES = '[Poems] Get Poem Likes';
export const GET_POEM_LIKES_SUCCESS = '[Poems] Get Poem Likes Success';
export const GET_POEM_LIKES_FAIL = '[Poems] Get Poem Likes Fail';

export const GET_POEM_COMMENTS = '[Poems] Get Poem Comments';
export const GET_POEM_COMMENTS_SUCCESS = '[Poems] Get Poem Comments Success';
export const GET_POEM_COMMENTS_FAIL = '[Poems] Get Poem Comments Fail';


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

// GET_POEM_LIKES
export class GetPoemLikes implements Action {
  readonly type = GET_POEM_LIKES;
  constructor(public payload: Poem) { }
}
export class GetPoemLikesSuccess implements Action {
  readonly type = GET_POEM_LIKES_SUCCESS;
  constructor(public payload: Like[]) { }
}
export class GetPoemLikesFail implements Action {
  readonly type = GET_POEM_LIKES_FAIL;
  constructor(public payload: any) { }
}

// GET_POEM_COMMENTS
export class GetPoemComments implements Action {
  readonly type = GET_POEM_COMMENTS;
  constructor(public payload: Poem) { }
}
export class GetPoemCommentsSuccess implements Action {
  readonly type = GET_POEM_COMMENTS_SUCCESS;
  constructor(public payload: Comment[]) { }
}
export class GetPoemCommentsFail implements Action {
  readonly type = GET_POEM_COMMENTS_FAIL;
  constructor(public payload: any) { }
}

export type PoemsAction =
  | GetPoems
  | GetPoemsSuccess
  | GetPoemsFail

  | GetPoemLikes
  | GetPoemLikesSuccess
  | GetPoemLikesFail

  | GetPoemComments
  | GetPoemCommentsSuccess
  | GetPoemCommentsFail;
