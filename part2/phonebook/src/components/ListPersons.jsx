const ListPersons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p>
          {person.name} - {person.number}{" "}
          <button onClick={() => onDelete(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default ListPersons;
