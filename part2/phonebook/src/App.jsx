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
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const onSubmitState = (event) => {
    event.preventDefault();
    duplicateCheck(newName);
    const personObject = {
      name: newName,
      phoneNumber: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const duplicateCheck = (name) => {
    for (let person of persons) {
      if (person.name === name) {
        alert(`${name} is already added to phonebook`);
        throw new Error("Duplicate name");
      }
    }
  };

  const listToShow = () => {
    return filter
      ? [...persons]
          .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person, index) => (
            <p key={index}>
              {person.name} - {person.phoneNumber}
            </p>
          ))
      : [...persons].map((person, index) => (
          <p key={index}>
            {person.name} - {person.phoneNumber}
          </p>
        ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterList
        filter={filter}
        handleFilterChange={(e) => setFilter(e.target.value)}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={onSubmitState}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <ListPersons personsToShow={listToShow} />
    </div>
  );
};

export default App;
