const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URL;

mongoose
  .connect(url, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        // Format: 12-345678   or 123-45678   or longer
        // Exactly one -, first part 2-3 digits, second part digits, total chars ≥ 8
        return /^(\d{2}|\d{3})-(\d+)$/.test(v) && v.length >= 8;
      },
      message: (props) =>
        `${props.value} is not a valid phone number! ` +
        "Use format like 12-3456789 or 123-456789 (min 8 characters, exactly one dash)",
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
