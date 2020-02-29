import { User } from '../../models/user.model';
import * as fromActions from '../actions';

export interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: fromActions.UserAction): UserState {
  switch (action.type) {
    case fromActions.LOGIN_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          name: action.payload.name,
          photoURL: action.payload.photoURL,
        },
      };
    }

    case fromActions.LOGIN_USER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromActions.LOGOUT_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: null,
      };
    }

    case fromActions.LOGOUT_USER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromActions.GET_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.GET_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          name: action.payload.name,
          photoURL: action.payload.photoURL,
        },
      };
    }

    case fromActions.GET_USER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        isAuthenticated: false
      };
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: UserState) => state.user;
export const isUserAuthenticated = (state: UserState) => state.isAuthenticated;
export const getPizzasLoading = (state: UserState) => state.loading;
export const getPizzasLoaded = (state: UserState) => state.loaded;
