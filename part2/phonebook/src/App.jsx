import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phoneNumber: "040-123456" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmitState}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          phone:{" "}
          <input type="tel" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {[...persons].map((person, index) => (
        <p key={index}>{person.name} - {person.phoneNumber}</p>
      ))}
    </div>
  );
};

export default App;
