import { useState, useEffect } from "react";
import FilterList from "./components/Filter";
import PersonForm from "./components/PersonForm";
import ListPersons from "./components/ListPersons";
import serverService from "./services/server";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  const createPersonsOnServer = (newPerson) => {
    serverService
      .createUser(newPerson)
      .then(() => {
        console.log("Person updated on server", newPerson);
        setMessage(`Added ${newPerson.name} to server`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error creating persons on server:", error);
        
      });
  };

  const updatePersonOnServer = (updatedPerson) => {
    serverService
      .updateUser(updatedPerson.id, updatedPerson)
      .then(() => {
        console.log("Person updated on server", updatedPerson);
        setMessage(` ${updatedPerson.name} updated on server`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        fetchPersons();
      })
      .catch((error) => {
        console.error("Error updating person on server:", error);
        
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
    if (duplicateCheck(newPerson)) {
      return;
    }
    const personWithId = {
      ...newPerson,
      id:
        persons.length > 0
          ? (Math.max(...persons.map((p) => p.id)) + 1).toString()
          : "1",
    };
    setPersons(persons.concat(personWithId));
    createPersonsOnServer(personWithId);
  };

  const duplicateCheck = (newPerson) => {
    const exists = persons.some((person) => person.name === newPerson.name);
    if (exists) {
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      updatePersonOnServer({
        ...persons.find((p) => p.name === newPerson.name),
        number: newPerson.number,
      });
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
      {message && <Notification message={message} className="notification" />}
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
