const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema(
  {
    // BLUEPRINT FOR DATA, NOT DATA (SEE BELOW)
    name: { type: String, required: true },
    color: { type: String, required: true },
    img: String,
    readyToEat: Boolean,
  },
  {
    // Second argument: Options object
    timestamps: true,
  }
);

const Fruit = mongoose.model("Vegetable", vegetableSchema);

module.exports = Fruit;
