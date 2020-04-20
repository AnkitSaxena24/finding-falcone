import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import FindFalconeReducer from './reducers/Find_Falcone_Reducer';

const store = createStore(
  combineReducers({
    FindFalconeReducer,
  }),
  applyMiddleware(thunk)
);

export default store;