
import personService from '../services/Persons';
import store from '../reducers/store'
import { createErrAction } from '../reducers/errorReducer';
import { createNotif } from '../reducers/notifReducer';
import { fetchPStore } from '../reducers/personReducer';

/**
 * Event Handlers
 */
export const publishPerson = async (nPerson) => {
    const tasks = store.getState().tasks;
    const duplicate = tasks.filter(person => person.title === nPerson.title);
    if(duplicate.length !== 0) { //if record exists
        store.dispatch(createErrAction(`${nPerson.title} is already added.`));
    } else {    // add new record
        try{
            const r = await personService.create(nPerson);
            store.dispatch(fetchPStore());
            store.dispatch(createNotif(`${r.title} has been added`));
        } catch (err) {
            console.log(err);
            store.dispatch(createErrAction(`${nPerson.title} could not be added: ${err}`));
        }
    }
}

export const deletePerson = async (id) => {
    const tasks = store.getState().tasks;

    const person = tasks.find(element => element.id === id);
    if(!person) {
        store.dispatch(createErrAction('Does not exist'));
    }
    const result = window.confirm(`Delete ${person.title}?`);
    if(result) {
        console.log('Deleting: ', id, person.title);
        try {
            await personService.remove(id);
            store.dispatch(fetchPStore());
            store.dispatch(createNotif('Successfully Deleted'));
        } catch (err) {
            store.dispatch(createErrAction(`${err}`));
        }
    }
}