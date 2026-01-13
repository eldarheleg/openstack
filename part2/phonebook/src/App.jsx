import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onSubmitState = (event) => {
    event.preventDefault();
    duplicateCheck(newName);
    const personObject = {
      name: newName,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
  };
  const duplicateCheck = (name) => {
    for (let person of persons) {
      if (person.name === name) {
        alert(`${name} is already added to phonebook`);
        throw new Error("Duplicate name");
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitState}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {[...persons].map((person, index) => (
        <p key={index}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
