const setLastTen = (state = [], action) => {
  switch(action.type) {
    case 'SET_LAST_TEN':
      return action.payload
    default: 
    return state;
  }
}

// this has the admin default card values.
export default setLastTen;