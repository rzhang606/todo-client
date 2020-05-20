import React, { useState } from 'react';
import Filter from './Filter';
import { deletePerson } from '../handlers/personHandler';

const People = ({persons = []}) => {
    const [ filter, setNewFilter ] = useState(''); // filter
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value);
    }

    let newPersons = persons;
    if(filter !== "") {
        newPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())); 
    }
    return (
        <div>
           {newPersons.map((person) =>
                <tr key={person.title}>
                    <td>
                        {person.title}
                    </td>
                    <td>
                        <button onClick={() => deletePerson(person.id)}>delete</button>
                    </td>
                </tr>
            )}
            <Filter input={filter} inputHandler={handleFilterChange}/>
        </div>
        
    )
}

export default People