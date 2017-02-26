import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_NEW_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNIN,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_NEW_USER_SUCCESS,
  SIGN_OUT_USER,
  AUTH_USER
} from '../actions/types';

const INITIAL_STATE = {

  error: '',
  authenticated: false,
  // password: '',
  // user: null,
  // newUser: false,
  // email: '',
  // loading: false,
  // isUserSignedIn: false,
  // isInProgress: false,
  // hasError: false,
  // errorMessage: '',
  // uid: 0
 };

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, error: '', loading: false, uid: 0 };
    case LOGIN_NEW_USER_SUCCESS:
      return { ...state, user: action.payload, error: '', loading: false, newUser: true, uid: 0 };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false, password: '' };
    // facebook login
    case SIGNIN_SUCCESS:
        const { uid } = action;
            return {
              ...state,
              isUserSignedIn: true,
              isInProgress: false,
              uid
        };
    // case SIGNIN_NEW_USER_SUCCESS:
    //         return {
    //           ...state,
    //           isUserSignedIn: true,
    //           isInProgress: false,
    //           newUser: true,
    //           uid
    //     };
    case SIGNIN:
        return {
          ...state,
          isInProgress: true,
          uid
    };
    case SIGNIN_ERROR:
        const { errorMessage } = action;
            return {
              ...state,
              hasError: true,
              errorMessage: 'BUMMER'
        };
    case AUTH_USER:
          return {
            ...state,
            authenticated: true,
            user: action.payload,
            error: null
          };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null
      };
        // case AUTH_ERROR:
        //   return {
        //     ...state,
        //     error: action.payload.message
        //   };

    default:
        return state;
      }
    };
