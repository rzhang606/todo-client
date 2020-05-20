import React, { useState } from 'react';
import Filter from './Filter';
import { deleteTask } from '../handlers/taskHandler';

const TaskList = ({tasks = []}) => {
    const [ filter, setNewFilter ] = useState(''); // filter
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }

    let filteredTasks = tasks;
    if(filter !== "") {
        filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase())); 
    }
    return (
        <div>
           {filteredTasks.map((task) =>
                <p key={task.title}>
                    {task.title}
                    <button onClick={() => deleteTask(task.id)}>delete</button>
                </p>
            )}
            <Filter input={filter} inputHandler={handleFilterChange}/>
        </div>
        
    )
}

export default TaskList