import  {createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import taskReducer from './taskReducer';
import errorReducer from './errorReducer';
import notifReducer from './notifReducer';

const reducers = combineReducers({
    tasks: taskReducer,
    error: errorReducer,
    notification: notifReducer
});
const store = createStore(
    reducers,
    applyMiddleware(thunk)
);
console.log('State:', store.getState());

export default store;