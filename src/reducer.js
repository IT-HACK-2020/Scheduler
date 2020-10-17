export const initialState = {
  currentDateClick: null,
  saveData: JSON.parse(localStorage.getItem("events")) || [],
  user: null
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
            id: action.id,
            day: action.day,
            title: action.title,
            timeStart: action.timeStart,
            timeEnd: action.timeEnd,
            allDay: action.allDay,
            description: action.description,
            done: action.done
          },
        ],
      };
    case "CHANGE_DATE":
      return {
        ...state,
        saveData: state.saveData.map((event) => {
          if (event.id === action.id) {
            console.log(event);
            return {
              id: action.id,
              day: action.day,
              title: action.title,
              timeStart: action.timeStart,
              timeEnd: action.timeEnd,
              allDay: action.allDay,
              description: action.description,
              done: action.done,
              changed: action.changed,
            };
          } else return event;
        }),
      };
    case "DELETE_DATE":
      return {
        ...state,
        saveData: state.saveData.filter((event) => event.id !== action.id)
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
};

export default reducer;
