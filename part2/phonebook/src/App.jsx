import { useState, useEffect } from "react";
import FilterList from "./components/Filter";
import PersonForm from "./components/PersonForm";
import ListPersons from "./components/ListPersons";
import axios from "axios";
import serverService from "./services/server";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  const updatePersonsOnServer = (newPerson) => {
    //console.log("Updating persons on server with:", newPerson);
    serverService
      .create(newPerson)
      .catch((error) => {
        console.error("Error updating persons on server:", error);
      });
  };

  useEffect(() => {
    serverService.getAll().then((response) => {
      //console.log("Fetched persons from server:", response);
      setPersons(response.data);
    });
  }, []);

  const onAddPerson = (newPerson) => {
    if (duplicateCheck(newPerson.name)) {
      return;
    }
    const personWithId = {
      ...newPerson,
      id:
        persons.length > 0
          ? (Math.max(...persons.map((p) => p.id)) + 1).toString()
          : "1",
    };

    //console.log("Adding person:", personWithId);

    setPersons(persons.concat(personWithId));
    //console.log("Persons after addition:", persons.concat(personWithId));
    updatePersonsOnServer(personWithId);
    //console.log("Server update initiated");
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
