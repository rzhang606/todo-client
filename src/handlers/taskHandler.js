
import taskService from '../services/Tasks';
import store from '../reducers/store'
import { createErrAction } from '../reducers/errorReducer';
import { createNotif } from '../reducers/notifReducer';
import { fetchPStore } from '../reducers/taskReducer';

/**
 * Event Handlers
 */
export const publishTask = async (ntask) => {
    const tasks = store.getState().tasks;
    const duplicate = tasks.filter(task => task.title === ntask.title);
    if(duplicate.length !== 0) { //if record exists
        store.dispatch(createErrAction(`${ntask.title} is already added.`));
    } else {    // add new record
        try{
            const r = await taskService.create(ntask);
            store.dispatch(fetchPStore());
            store.dispatch(createNotif(`${r.title} has been added`));
        } catch (err) {
            console.log(err);
            store.dispatch(createErrAction(`${ntask.title} could not be added: ${err}`));
        }
    }
}

export const deleteTask = async (id) => {
    const tasks = store.getState().tasks;

    const task = tasks.find(element => element.id === id);
    if(!task) {
        store.dispatch(createErrAction('Does not exist'));
    }
    const result = window.confirm(`Delete ${task.title}?`);
    if(result) {
        console.log('Deleting: ', id, task.title);
        try {
            await taskService.remove(id);
            store.dispatch(fetchPStore());
            store.dispatch(createNotif('Successfully Deleted'));
        } catch (err) {
            store.dispatch(createErrAction(`${err}`));
        }
    }
}