import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import multi from "redux-multi";
import reducers from "./ducks";

const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers);

export default store;
