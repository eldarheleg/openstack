const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://openstack_db:${password}@cluster0.slxtqk1.mongodb.net/?appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  // Only password provided - list all persons
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  // Password + name + number provided - add person
  const person = new Person({
    id: 1,
    name: process.argv[3] || "/",
    number: process.argv[4] || "/",
  });

  person.save().then((result) => {
    console.log(
      "Added " +
        process.argv[3] +
        " number " +
        process.argv[4] +
        " to phonebook"
    );
    mongoose.connection.close();
  });
}
