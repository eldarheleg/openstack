import { useState, useEffect, use } from "react";
import FilterList from "./components/Filter";
import PersonForm from "./components/PersonForm";
import ListPersons from "./components/ListPersons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log('promise fulfilled')
      setPersons(response.data);
    })}, []);

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
