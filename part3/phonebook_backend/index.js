require("dotenv").config();
const express = require("express");
const Person = require("./models/person.js");

const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    console.log("Fetching all persons from database" + persons);
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

app.put("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const { number } = request.body;

  if (!number) {
    return response.status(400).json({ error: "number is missing" });
  }

  Person.findByIdAndUpdate(id, { number }, { new: true })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return response.status(404).json({ error: "person not found" });
      }
      response.json(updatedPerson);
    })
    .catch((error) => {
      console.error("Error updating person in database:", error);
      response.status(500).json({ error: "failed to update person" });
    });
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name || !person.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }
  Person.find({}).then((persons) => {
    if (persons.find((p) => p.name === person.name)) {
      return response.status(400).json({ error: "name must be unique" });
    }
    let maxId =
      persons.length > 0 ? Math.max(...persons.map((p) => p.personId)) : 0;

    const newPerson = new Person({
      name: person.name,
      number: person.number,
      personId: maxId + 1,
    });
    newPerson
      .save()
      .then((savedPerson) => {
        console.log("Saved new person to database:", savedPerson);
        response.json(savedPerson);
      })
      .catch((error) => {
        console.error("Error saving person to database:", error);
        response.status(500).json({ error: "failed to save person" });
      });
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log(request.params);
  const person = Person.findById(id);
  if (person) {
    Person.findByIdAndDelete(id).then(() => {
      console.log(`Deleting person with id: ${id}`);
      response.status(204).end();
    });
  } else {
    response.status(404).end();
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
