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
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = "success", durationMs = 5000) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), durationMs);
  };

  const fetchPersons = () => {
    serverService
      .getAll()
      .then((response) => {
        console.log("Fetched persons from server:", response.data);
        setPersons(response.data);
      })
      .catch((err) =>
        showMessage(
          err.response?.data?.error || "Error fetching persons from server",
          "error",
          5000,
        ),
      );
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleAddOrUpdate = (newPerson) => {
    console.log("Adding new person:", newPerson);
    const exists = persons.some((p) => p.name === newPerson.name);
    if (exists) {
      window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`,
      );
      serverService
        .updatePerson(
          persons.find((p) => p.name === newPerson.name).id,
          newPerson,
        )
        .then(() => {
          setMessage({
            text: `Updated ${newPerson.name}'s number`,
            type: "success",
          });
          fetchPersons();
        })
        .catch((error) => {
          setMessage({
            text:
              error.response?.data?.error || `Error updating ${newPerson.name}`,
            type: "error",
          });
        });
      return;
    }

    serverService
      .createPerson(newPerson)
      .then(() => {
        setMessage({
          text: `Added ${newPerson.name}`,
          type: "success",
        });
        setPersons(persons.concat(newPerson));
        fetchPersons();
      })
      .catch((error) => {
        setMessage({
          text: error.response?.data?.error || `Error adding ${newPerson.name}`,
          type: "error",
        });
      });
  };

  const handleDelete = (id, name) => {
    if (!window.confirm("Are you sure you want to delete this person?")) {
      return;
    }

    serverService
      .deletePerson(id)
      .then(() => {
        showMessage(`${name} deleted successfully`);
        fetchPersons();
      })
      .catch((error) => {
        setMessage({
          text: error.response?.data?.error || `Error deleting ${name}`,
          type: "error",
        });
      });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterList value={filter} onChange={(e) => setFilter(e.target.value)} />
      {message && <Notification message={message} className="notification" />}
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleAddOrUpdate} />
      <h2>Numbers</h2>
      <ListPersons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
