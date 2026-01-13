import { useState } from "react";
import FilterList from "./components/Filter";
import PersonForm from "./components/PersonForm";
import ListPersons from "./components/ListPersons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
    { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");

  const onAddPerson = (newPerson) => {
    if (duplicateCheck(newPerson.name)) {
      return;
    }
    const personWithId = {
      ...newPerson,
      id: persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1,
    };
    setPersons(persons.concat(personWithId));
  };

  const duplicateCheck = (name) => {
    const exists = persons.some((person) => person.name === name);
    if (exists) {
      alert(`${name} is already added to phonebook`);
    }
    return exists;
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterList
        filter={filter}
        handleFilterChange={(e) => setFilter(e.target.value)}
      />
      <h2>Add a new</h2>
      <PersonForm onAddPerson={onAddPerson} />
      <h2>Numbers</h2>
      <ListPersons persons={filteredPersons} />
    </div>
  );
};

export default App;
