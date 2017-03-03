import firebase from 'firebase';
import axios from 'axios';
import portlandRivers from '../rivers';


import {
  RIVER_SELECT,
  RIVERS_FETCH_SUCCESS,
  API_RIVERS_FETCH,
  RIVER_DELETE,
  INITIAL_RIVER_LIST
} from './types';

// export function selectRiver(river) {
//   // selectBook is an ActionCreator, it needs to return an action,
//   // an object with a type property.
//   return {
//     type: 'RIVER_SELECTED',
//     payload: river
//   };
// }


export const fetchRiverList = () => {
  return (dispatch) => {
    dispatch({ type: INITIAL_RIVER_LIST, payload: portlandRivers })
  }
}

export const riverSelect = (river) => {
  let uid = firebase.auth().currentUser.uid;

  return (dispatch) => {
    firebase.database().ref(`/users/${uid}/rivers`)
      .push(river)
      .then(() => {
        dispatch({ type: RIVER_SELECT });
      });
  };
};


// const userUid = firebase.auth().currentUser.uid;
// const fuid = 'hey';
// for (let key in localStorage) {
//     if (key.startsWith("firebase:authUser:")) {
//       const value = JSON.parse(localStorage.getItem(key));
//       console.log(value.uid);
//       const fuid = value.uid;
// //       if (value.uid) {
// //       userUid = value.uid;
// //   }
//   }
//   // console.log(fuid);
// }
// console.log(fuid, 'user Uid');

export const riversFetch = () => {
  //
  // console.log(firebase.auth().currentUser.uid, 'user id in riv fetch');
  let uid = firebase.auth().currentUser.uid;
  return (dispatch) => {
    firebase.database().ref(`/users/${uid}/rivers`)
      .on('value', snapshot => {
        dispatch({ type: RIVERS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};



export const riverDelete = ({uid}) => {
  const { currentUser } = firebase.auth();
  console.log({uid});
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/rivers/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: RIVER_DELETE});
      });
  };
};


const ROOT_URL = `https://waterservices.usgs.gov/nwis/iv/?format=json`

const PARAM_URL = `&parameterCd=00060&siteStatus=all`;


export const fetchApiRivers = (riverIds) => {
  const url = `${ROOT_URL}&sites=${riverIds}${PARAM_URL}`;
  const request = axios.get(url)
  return {type: API_RIVERS_FETCH, payload: request};
}
