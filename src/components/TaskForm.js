import React, {useState} from 'react'
import FormField from './FormField'
import Togglable from './Togglable'
import { publishPerson } from '../handlers/personHandler';
import { Form, Button } from 'react-bootstrap'

const TaskForm = ({user}) => {
    const [ title, setTitle ] = useState(''); // form input title

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const createTask = (event) => {
        event.preventDefault();
        publishPerson({ 
            title: title,
        });

        setTitle('');
    }
    
    return (
        <Togglable buttonLabel='Create new task'>
            <h2>Add new task as {user.name}:</h2>
            <Form onSubmit={createTask}>
                <FormField title="Title" input={title} inputHandler={handleTitleChange} />
                <Button type="submit">Add</Button>
            </Form>
        </Togglable>
    )
}

export default TaskForm