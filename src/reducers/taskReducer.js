import taskService from '../services/Tasks';
import { createHTTPErrAction } from './errorReducer';

/**
 * Reducer
 */
const taskReducer = (state = [], action) => {
    console.log('Action:', action);
    switch(action.type) {
        case 'T_SET':
            return action.data;
        default:
            return state;
    }
}

/**
 * Action Creators
 */
const set_action = (tasks) => {
    return {
        type: 'T_SET',
        data: tasks
    }
}

export const fetchPStore = () => {
    return (dispatch) => {
        taskService.getAll()
            .then( response => dispatch(set_action(response)))
            .catch( err => dispatch(createHTTPErrAction(err)));
    }
}

export default taskReducer;