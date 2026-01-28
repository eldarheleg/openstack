require("dotenv").config();
const express = require("express");
const Person = require("./models/person.js");

const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/info", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const date = new Date();
      res.send(
        `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`,
      );
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ error: "Number is missing" });
  }

  Person.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true },
  )
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).json({ error: "Person not found" });
      }
      res.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (req, res, next) => {
  const person = req.body;
  if (!person.name || !person.number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  if (!/^(\d{2}|\d{3})-(\d+)$/.test(person.number) || person.number.length < 8) {
    return res.status(400).json({
      error: "Invalid phone number format. Use e.g. 12-3456789 or 040-1234567 (min 8 chars)"
    });
  }

  Person.findOne({ name: person.name })
    .then((existingPerson) => {
      if (existingPerson) {
        return res.status(409).json({ error: "Name must be unique" });
      }
      const newPerson = new Person({
        name: person.name,
        number: person.number,
      });
      newPerson
        .save()
        .then((savedPerson) => {
          res.json(savedPerson);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const person = Person.findById(req.params.id);
  if (!person) {
    return res.status(404).json({ error: "Person not found" });
  }
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Malformatted id" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: Object.values(error.errors).map((e) => e.message),
    });
  }

  res.status(500).json({ error: "Something went wrong on the server" });
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
