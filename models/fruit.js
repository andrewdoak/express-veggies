const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema(
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

const Fruit = mongoose.model("Fruit", fruitSchema);

module.exports = Fruit;

/* 
Create new Schema class and invoke it.

SCHEMA:
(Blueprint for data, describing what a fruit document will look like)
Will be a string datatype, key is required.
In order to create a fruit doc, you have to have a name field
(Can also put a default value, make it "unique:true")

For details, see: 
https://mongoosejs.com/docs/guide.html#definition

MODEL:
// Capitalize models. Use model Method
const Fruit = mongoose.model("Fruit", fruitSchema);

EXPORT: 
// SO WE CAN USE IN OTHER FILES!
module.exports = Fruit;

SERVER: 
// Update Import
const Fruit = require("./models/fruit");

*/
