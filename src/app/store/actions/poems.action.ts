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

export const ADD_POEM_LIKE = '[Poems] Add Poem Like';
export const ADD_POEM_LIKE_SUCCESS = '[Poems] Add Poem Like Success';
export const ADD_POEM_LIKE_FAIL = '[Poems] Add Poem Like Fail';

export const REMOVE_POEM_LIKE = '[Poems] Remove Poem Like';
export const REMOVE_POEM_LIKE_SUCCESS = '[Poems] Remove Poem Like Success';
export const REMOVE_POEM_LIKE_FAIL = '[Poems] Remove Poem Like Fail';

export const ADD_POEM_COMMENT = '[Poems] Add Poem Comment';
export const ADD_POEM_COMMENT_SUCCESS = '[Poems] Add Poem Comment Success';
export const ADD_POEM_COMMENT_FAIL = '[Poems] Add Poem Comment Fail';

export const REMOVE_POEM_COMMENT = '[Poems] Remove Poem Comment';
export const REMOVE_POEM_COMMENT_SUCCESS = '[Poems] Remove Poem Comment Success';
export const REMOVE_POEM_COMMENT_FAIL = '[Poems] Remove Poem Comment Fail';


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

// ADD_POEM_LIKE
export class AddPoemLike implements Action {
  readonly type = ADD_POEM_LIKE;
  constructor(public payload?: any) { }
}
export class AddPoemLikeSuccess implements Action {
  readonly type = ADD_POEM_LIKE_SUCCESS;
  constructor(public payload?: any) { }
}
export class AddPoemLikeFail implements Action {
  readonly type = ADD_POEM_LIKE_FAIL;
  constructor(public payload?: any) { }
}

// REMOVE_POEM_LIKE
export class RemovePoemLike implements Action {
  readonly type = REMOVE_POEM_LIKE;
  constructor(public payload?: any) { }
}
export class RemovePoemLikeSuccess implements Action {
  readonly type = REMOVE_POEM_LIKE_SUCCESS;
  constructor(public payload?: any) { }
}
export class RemovePoemLikeFail implements Action {
  readonly type = REMOVE_POEM_LIKE_FAIL;
  constructor(public payload?: any) { }
}

// ADD_POEM_COMMENT
export class AddPoemComment implements Action {
  readonly type = ADD_POEM_COMMENT;
  constructor(public payload?: any) { }
}
export class AddPoemCommentSuccess implements Action {
  readonly type = ADD_POEM_COMMENT_SUCCESS;
  constructor(public payload?: any) { }
}
export class AddPoemCommentFail implements Action {
  readonly type = ADD_POEM_COMMENT_FAIL;
  constructor(public payload?: any) { }
}

// REMOVE_POEM_COMMENT
export class RemovePoemComment implements Action {
  readonly type = REMOVE_POEM_COMMENT;
  constructor(public payload?: any) { }
}
export class RemovePoemCommentSuccess implements Action {
  readonly type = REMOVE_POEM_COMMENT_SUCCESS;
  constructor(public payload?: any) { }
}
export class RemovePoemCommentFail implements Action {
  readonly type = REMOVE_POEM_COMMENT_FAIL;
  constructor(public payload?: any) { }
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
  | GetPoemCommentsFail

  | AddPoemLike
  | AddPoemLikeSuccess
  | AddPoemLikeFail

  | RemovePoemLike
  | RemovePoemLikeSuccess
  | RemovePoemLikeFail

  | AddPoemComment
  | AddPoemCommentSuccess
  | AddPoemCommentFail

  | RemovePoemComment
  | RemovePoemCommentSuccess
  | RemovePoemCommentFail;
