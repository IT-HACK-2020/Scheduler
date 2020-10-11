export const initialState = {
  currentDateClick: null,
  saveData: []
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_DATE':
      // console.log(state.currentDateClick);
      return {
        ...state,
        currentDateClick: action.date
      }
    case 'SAVE_DATE':
      return {
        ...state,
        saveData: [...state.saveData, {
          day: action.day,
          title: action.title,
          location: action.location,
          dateStart: action.dateStart,
          dateEnd: action.dateEnd,
          timeStart: action.timeStart,
          timeEnd: action.timeEnd,
          description: action.description
        }]
      }
  }
}

export default reducer;