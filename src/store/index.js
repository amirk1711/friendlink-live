import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import the combined reducer as 'reducer' by default
import reducer from '../reducers/index';

let store;

export function configureStore() {
    // create redux store, pass reducer and middlewares as arguments
    store = createStore(reducer, applyMiddleware(thunk, logger));
    return store;
}
