import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
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
    private poemsService: PoemsService
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
}

