import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions';
import { PoemsService } from '../../services/poems.service';
import { Poem } from '../../models/poem.model';

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
}

