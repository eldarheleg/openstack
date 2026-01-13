import { useState, useEffect } from "react";
import FilterList from "./components/Filter";
import PersonForm from "./components/PersonForm";
import ListPersons from "./components/ListPersons";
import serverService from "./services/server";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  const updatePersonsOnServer = (newPerson) => {
    serverService.createUser(newPerson).catch((error) => {
      console.error("Error updating persons on server:", error);
    });
  };

  const deletePersonFromServer = (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) {
      return;
    }

    serverService
      .deleteUser(id)
      .then(() => {
        fetchPersons();
      })
      .catch((error) => {
        console.error("Error deleting person from server:", error);
      });
  };

  const fetchPersons = () => {
    serverService.getAll().then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(() => {
    fetchPersons();
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
      <ListPersons
        persons={filteredPersons}
        onDeletePerson={deletePersonFromServer}
      />
    </div>
  );
};

export default App;
