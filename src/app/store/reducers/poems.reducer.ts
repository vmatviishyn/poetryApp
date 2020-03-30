import { Poem } from '../../models/poem.model';
import { Like } from '../../models/like.model';
import { Comment } from '../../models/comment.model';
import * as fromActions from '../actions';

export interface PoemsState {
  poems: Poem[] | [];
  activePoem: Poem | {};
  likes: Like[] | [];
  comments: Comment[] | [];
  loaded: boolean;
  loading: boolean;
}

export const initialState: PoemsState = {
  poems: [],
  activePoem: null,
  likes: [],
  comments: [],
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
        loaded: true,
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

    case fromActions.GET_POEM: {
      return {
        ...state,
        loading: true,
        activePoem: null
      };
    }
    case fromActions.GET_POEM_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        activePoem: action.payload
      };
    }
    case fromActions.GET_POEM_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromActions.GET_POEM_LIKES: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromActions.GET_POEM_LIKES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        likes: [
          ...action.payload
        ]
      };
    }
    case fromActions.GET_POEM_LIKES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromActions.GET_POEM_COMMENTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromActions.GET_POEM_COMMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        comments: [
          ...action.payload
        ]
      };
    }
    case fromActions.GET_POEM_COMMENTS_FAIL: {
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
