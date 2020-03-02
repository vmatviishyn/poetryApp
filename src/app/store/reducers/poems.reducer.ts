import { Poem } from '../../models/poem.model';
import * as fromActions from '../actions';

export interface PoemsState {
  poems: Poem[] | [];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PoemsState = {
  poems: [],
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromActions.PoemsAction): PoemsState {
  switch (action.type) {

    case fromActions.GET_POEMS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.GET_POEMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: false,
        poems: [
          ...action.payload
        ]
      };
    }

    case fromActions.GET_POEMS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    default: {
      return state;
    }
  }
}
