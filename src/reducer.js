export const initialState = {
  currentDateClick: null,
  saveData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATE":
      // console.log(state.currentDateClick);
      return {
        ...state,
        currentDateClick: action.date,
      };
    case "SAVE_DATE":
      return {
        ...state,
        saveData: [
          ...state.saveData,
          {
            day: action.day,
            title: action.title,
            location: action.location,
            dateStart: action.dateStart,
            dateEnd: action.dateEnd,
            timeStart: action.timeStart,
            timeEnd: action.timeEnd,
            allDay: action.allDay,
            description: action.description,
          },
        ],
      };
    case "CHANGE_DATE":
      return {
        ...state,
        saveData: state.saveData.map((event) => {
          if (event.title === action.title) {
            console.log(event);
            return {
              day: action.day,
              title: action.title,
              location: action.location,
              dateStart: action.dateStart,
              dateEnd: action.dateEnd,
              timeStart: action.timeStart,
              timeEnd: action.timeEnd,
              allDay: action.allDay,
              description: action.description,
              changed: action.changed,
            };
          } else return event;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
