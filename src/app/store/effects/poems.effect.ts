import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AngularFireStorage } from '@angular/fire/storage';

import { map, switchMap, catchError, pluck } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from '../actions';
import { PoemsService } from '../../services/poems.service';

import { Poem } from '../../models/poem.model';
import { Like } from '../../models/like.model';
import { Comment } from '../../models/comment.model';

@Injectable()
export class PoemsEffects {

  constructor(
    private actions: Actions,
    private poemsService: PoemsService,
    private storage: AngularFireStorage,
  ) { }

  @Effect()
  getPoems$ = this.actions.pipe(
    ofType(fromActions.GET_POEMS),
    switchMap(() => {
      return this.poemsService.getPoems().pipe(
        map((poems: Poem[]) => new fromActions.GetPoemsSuccess(poems)),
        catchError(error => of(new fromActions.GetPoemsFail(error)))
      );
    })
  );

  @Effect()
  getPoem$ = this.actions.pipe(
    ofType(fromActions.GET_POEM),
    pluck('payload'),
    switchMap((poemId: string) => {
      return this.poemsService.getPoem(poemId).pipe(
        map((poem: Poem) => new fromActions.GetPoemSuccess(poem)),
        catchError(error => of(new fromActions.GetPoemFail(error)))
      );
    })
  );

  @Effect()
  addPoem$ = this.actions.pipe(
    ofType(fromActions.ADD_POEM),
    pluck('payload'),
    switchMap((poem: Poem) => {
      return of(this.poemsService.addPoem(poem)).pipe(
        map(() => new fromActions.AddPoemSuccess()),
        catchError(error => of(new fromActions.AddPoemFail(error)))
      );
    })
  );

  @Effect()
  editPoem$ = this.actions.pipe(
    ofType(fromActions.EDIT_POEM),
    pluck('payload'),
    switchMap((poem: Poem) => {
      return this.poemsService.editPoem(poem).pipe(
        map(() => new fromActions.EditPoemSuccess()),
        catchError(error => of(new fromActions.EditPoemFail(error)))
      );
    })
  );

  @Effect()
  removePoem$ = this.actions.pipe(
    ofType(fromActions.REMOVE_POEM),
    pluck('payload'),
    switchMap((poem: Poem) => {
      return this.poemsService.deletePoem(poem).pipe(
        map(() => new fromActions.RemovePoemSuccess(poem)),
        catchError(error => of(new fromActions.RemovePoemFail(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  removeCommentsOnRemovePoemSuccess$ = this.actions.pipe(
    ofType(fromActions.REMOVE_POEM_SUCCESS),
    pluck('payload'),
    map((poem: Poem) => this.poemsService.deleteCommentByPoemId(poem.poemId)),
  );

  @Effect({ dispatch: false })
  removeLikesOnRemovePoemSuccess$ = this.actions.pipe(
    ofType(fromActions.REMOVE_POEM_SUCCESS),
    pluck('payload'),
    map((poem: Poem) => this.poemsService.removeLikeByPoemId(poem.poemId)),
  );

  @Effect({ dispatch: false })
  removePhotoOnRemovePoemSuccess$ = this.actions.pipe(
    ofType(fromActions.REMOVE_POEM_SUCCESS),
    pluck('payload'),
    map((poem: Poem) => this.storage.ref(poem.poemImagePath).delete()),
  );

  @Effect()
  getPoemLikes$ = this.actions.pipe(
    ofType(fromActions.GET_POEM_LIKES),
    pluck('payload'),
    switchMap((poem: Poem) => {
      return this.poemsService.getLikes(poem).pipe(
        map((likes: Like[]) => new fromActions.GetPoemLikesSuccess(likes)),
        catchError(error => of(new fromActions.GetPoemLikesFail(error)))
      );
    })
  );

  @Effect()
  getPoemComments$ = this.actions.pipe(
    ofType(fromActions.GET_POEM_COMMENTS),
    pluck('payload'),
    switchMap((poem: Poem) => {
      return this.poemsService.getComments(poem).pipe(
        map((comments: Comment[]) => new fromActions.GetPoemCommentsSuccess(comments)),
        catchError(error => of(new fromActions.GetPoemCommentsFail(error)))
      );
    })
  );

  @Effect()
  addPoemLike$ = this.actions.pipe(
    ofType(fromActions.ADD_POEM_LIKE),
    pluck('payload'),
    switchMap((payload: any) => {
      return of(this.poemsService.addLike(payload.poem, payload.user)).pipe(
        map(() => new fromActions.AddPoemLikeSuccess()),
        catchError(error => of(new fromActions.AddPoemLikeFail(error)))
      );
    })
  );

  @Effect()
  removePoemLike$ = this.actions.pipe(
    ofType(fromActions.REMOVE_POEM_LIKE),
    pluck('payload'),
    switchMap((payload: any) => {
      return this.poemsService.removeLike(payload.poem, payload.user).pipe(
        map(() => new fromActions.RemovePoemLikeSuccess()),
        catchError(error => of(new fromActions.RemovePoemLikeFail(error)))
      );
    })
  );

  @Effect()
  addPoemComment$ = this.actions.pipe(
    ofType(fromActions.ADD_POEM_COMMENT),
    pluck('payload'),
    switchMap((payload: any) => {
      return of(this.poemsService.addComment(payload.poem, payload.user, payload.comment)).pipe(
        map(() => new fromActions.AddPoemCommentSuccess()),
        catchError(error => of(new fromActions.AddPoemCommentFail(error)))
      );
    })
  );

  @Effect()
  removePoemComment$ = this.actions.pipe(
    ofType(fromActions.REMOVE_POEM_COMMENT),
    pluck('payload'),
    switchMap((comment: Comment) => {
      return this.poemsService.deleteComment(comment).pipe(
        map(() => new fromActions.RemovePoemCommentSuccess()),
        catchError(error => of(new fromActions.RemovePoemCommentFail(error)))
      );
    })
  );
}

