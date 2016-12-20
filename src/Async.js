export default function ({ dispatch }) {
  return next => action => {
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    action.payload
      .then(function(response) {
        const newAction = { ...action, payload: response };
        dispatch(newAction);
      });
      setInterval(() => {
        action.payload
        .then(function(response) {
          const newAction = { ...action, payload: response };
          dispatch(newAction);
        })
      }, 900000);
  }
}
