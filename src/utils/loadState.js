export const loadState = () => {
  try {
    const localStateSerialized = localStorage.getItem('scanner');

    return {
      ...(localStateSerialized === null ? {} : JSON.parse(localStateSerialized)),
    };
  } catch (err) {
    return undefined;
  }
};

export const saveStateToLocal = (state) => {
  if (state.auth.readyStatus !== 'FETCH_AUTH_REQUEST') {
    try {
      const serializedState = JSON.stringify(state);

      if (typeof localStorage !== 'undefined' && localStorage !== null) {
        localStorage.setItem('scanner', serializedState);
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
