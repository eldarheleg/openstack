const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require("cors");

const corsOptions = {
  origin: 'http://localhost:5173', // Only allow your frontend
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json());

app.use(express.static('dist'))

// const morganFunction = morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, "content-length"),
//     "-",
//     tokens["response-time"](req, res),
//     "ms",
//     req.body ? JSON.stringify(req.body) : "/",
//   ].join(" ");
// });

// app.use(morganFunction);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const infoLength = persons.length;
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${infoLength} people</p><p>${date}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  console.log(request);
  const person = request.body;
  if (!person.name || !person.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }
  if (persons.find((p) => p.name === person.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }
  const id = (Math.max(...persons.map((p) => Number(p.id))) + 1).toString();
  const newPerson = { id, ...person };
  persons = persons.concat(newPerson);
  //console.log(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    persons = persons.filter((p) => p.id !== id);
    console.log(`Deleting person with id: ${id}`);
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
