const ListPersons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} - {person.phoneNumber}
        </p>
      ))}
    </div>
  );
};

export default ListPersons;
