require("dotenv").config();
const express = require("express");
const Person = require("./models/person.js");

const app = express();

app.use(express.json());

app.use(express.static("dist"));

let persons = [];

// Load persons from database on startup
Person.find({}).then((loadedPersons) => {
  persons = loadedPersons;
  console.log("Loaded persons from database");
  console.log(persons);
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
  //   Person.find({}).then((persons) => {
  //     console.log(persons);
  //   });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/info", (request, response) => {
  Person.find({}).then((persons) => {
    const infoLength = persons.length;
    const date = new Date();
    response.send(
      `<p>Phonebook has info for ${infoLength} people</p><p>${date}</p>`,
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const person = Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name || !person.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }
  if (persons.find((p) => p.name === person.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id) || 0)) : 0;
  const newNumericId = (maxId + 1).toString();

  const newPerson = new Person({
    name: person.name,
    number: person.number,
    id: newNumericId,
  });

  Person.create(newPerson)
    .then((savedPerson) => {
      persons = persons.concat(savedPerson);
      response.json(savedPerson);
    })
    .catch((error) => {
      console.log("Error saving person:", error.message);
      response.status(500).json({ error: "internal server error" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log(request.params);
  const person = persons.find((person) => person._id.toString() === id);
  if (person) {
    persons = persons.filter((p) => p._id.toString() !== id);
    Person.findByIdAndDelete(id).then(() => {
      console.log(`Deleting person with id: ${id}`);
      response.status(204).end();
    });
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
