import firebase from 'firebase';


import {
  RIVER_SELECT,
  RIVERS_FETCH_SUCCESS,

} from './types';

export function selectRiver(river) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: 'RIVER_SELECTED',
    payload: river
  };
}



// export const riverSelect = ({ river }) => {
//   const { currentUser } = firebase.auth();
//
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/rivers`)
//       .push({ river })
//       .then(() => {
//         dispatch({ type: RIVER_SELECT });
//       });
//   };
// };
//
// export const riversFetch = () => {
//   const { currentUser } = firebase.auth();
//
//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/rivers`)
//       .on('value', snapshot => {
//         dispatch({ type: RIVERS_FETCH_SUCCESS, payload: snapshot.val() });
//       });
//   };
// };
//
//
//
// export const riverDelete = ({ uid }) => {
//   const { currentUser } = firebase.auth();
//
//   return () => {
//     firebase.database().ref(`/users/${currentUser.uid}/rivers/${uid}`)
//       .remove()
//   };
// };
