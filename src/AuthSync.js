import firebase from 'firebase';
import * as Actions from './actions';

export function verifyAuth(dispatch) {
    return new Promise((resolve, reject) => {
      const unsub = firebase.auth().onAuthStateChanged(
        user => {
          dispatch(Actions.authUser(user));
          unsub();
          resolve();
        },
        error => reject(error)
      );
    });
}
