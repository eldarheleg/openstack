const ListPersons = ({ personsToShow }) => {
    console.log("Rendering ListPersons" + personsToShow);
  return (
    personsToShow()
  );
}

export default ListPersons;