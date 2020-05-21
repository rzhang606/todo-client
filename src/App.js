import React, { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import TaskForm from './components/TaskForm'

import taskService from './services/Tasks'
import loginService from './services/Login'

import store from './reducers/store';
import { fetchPStore } from './reducers/taskReducer'
import { createErrAction } from './reducers/errorReducer';
import { createNotif } from './reducers/notifReducer';

import { Button } from 'react-bootstrap'

const App = () => {

    const [ user, setUser ] = useState(null);

    //uses username and password to login, then saves the retrieved token and user details to 'user' field
    const login = async (creds) => {

        try{
            const user = await loginService.login(creds);

            //save token to local storage
            window.localStorage.setItem(
                'loggedPersonUser', JSON.stringify(user)
            );
            taskService.setToken(user.token);
            setUser(user);
            store.dispatch(createNotif(`Logged in as ${user.name}`));
        } catch (ex) {
            store.dispatch(createErrAction('Wrong Credentials'));
        }

        
    }
    const logOut = () => {
        window.localStorage.removeItem('loggedPersonUser');
        taskService.setToken(null);
        setUser(null);
        store.dispatch(createNotif('Logged Out'));
    }

    /**
     * Effects
     */
    //initial fetching of persons
    useEffect(() => {
        console.log('Fetching data ... ');
        store.dispatch(fetchPStore());
    }, []) // empty array tells it to only run initially

    //check for logged in user
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedPersonUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            store.dispatch(createNotif(`Logged in as ${user.name}`));
            taskService.setToken(user.token)
        }
    }, [])

    return (
        <div className='container'>
            <h2>To Do List</h2>
            <Notification/>
            <Error/>
            {user === null ?
                <div>
                    <LoginForm login={login} />
                    <h2>Please log in to view tasks</h2>
                </div>
                :
                <div>
                    <TaskForm user={user}/>
                    <Button onClick={logOut}>Log Out</Button>
                    <h2>Tasks</h2>
                    <TaskList tasks={store.getState().tasks}/>
                </div>}
        </div>
    )
}

export default App