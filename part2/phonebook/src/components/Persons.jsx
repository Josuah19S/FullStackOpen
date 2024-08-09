const Person = ({ person, removePerson }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={() => removePerson(person.id)}>delete</button>
        </div>
    );
};

const Persons = ({ persons, removePerson }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.id} person={person} removePerson={removePerson} />
            )}
        </div>
    );
};

export default Persons
