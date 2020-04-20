import axios from 'axios';

//Get token from API
export function getAPIToken() {
  return dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/token`, null, {
      headers: {
        'Accept': 'application/json' 
      }
    }).then((response) => {
      if(response && response.data) {
        dispatch({ type: "GET_TOKEN", token: response.data })
      }
    }).catch((error) => {
      console.log("Error in token", error);
    })
  }
}

//Get planets list
export function getPlanets() {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/planets`).then((response) => {
      if(response && response.data) {
        dispatch({ type: "GET_PLANETS", planets: response.data })
      }
    }).catch((error) => {
      console.log("Error in planets", error);
    })
  }
}

//Get vehicles list
export function getVehicles() {
  return dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/vehicles`).then((response) => {
      if(response && response.data) {
        dispatch({ type: "GET_VEHICLES", vehicles: response.data })
      }
    }).catch((error) => {
      console.log("Error in vehicles", error);
    })
  }
}


//Finding falcone API call
export function findFalcone(data, time_taken) {
  return dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/find`, data, {
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    }).then((response) => {
      if(response && response.data) {
        dispatch({ 
          type: "FIND_FALCONE", 
          status: response.data.status,  
          planet_name: response.data.planet_name,
          time_taken: time_taken
        })
      }
    }).catch((error) => {
      console.log("Error in getting final data", error);
    })
  }
}