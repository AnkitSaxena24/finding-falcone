const initialState = {
  planets: [],
  vehicles: [],
  token: '',
  time_taken: '',
  status: '',
  planet_name: ''
}

const find_falcone = (state = initialState, action) => {
  switch(action.type) {
    case "GET_TOKEN":
      state = {
        ...state,
        token: action.token
      }
      break;
    case "GET_PLANETS":
      state = {
        ...state,
        planets: action.planets
      }
      break;
    case "GET_VEHICLES":
      state = {
        ...state,
        vehicles: action.vehicles
      }
      break;
    case "FIND_FALCONE":
      state = {
        ...state,
        status: action.status,
        time_taken: action.time_taken,
        planet_name: action.planet_name
      }
      break;
    default:
      return state;
  }

  return state;
}

export default find_falcone;