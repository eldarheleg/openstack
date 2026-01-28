import { useState } from "react";

const PersonForm = ({ onSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newNumber.trim()) {
      alert("Name and phone number are required");
      return;
    }
    onSubmit({ name: newName, number: newNumber });
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          phone:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
