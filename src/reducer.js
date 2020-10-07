export const initialState = {
  currentDateClick: null
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_DATE':
      return {
        ...state,
        currentDateClick: action.date
      }
  }
}

export default reducer;