const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    //Typical layout of mongoose schema
    username: {
      //Each object inside a schema is a field
      type: String,
      required: true, //Must be entered
      unique: true, //cannot have duplicate entries
      trim: true, //Trims any whitespace from either end
      minlength: 3, //Minimum length of username
    },
  },
  {
    timestamps: true, //Records time that user was added
  }
);

const UserDTO = mongoose.model("User", userSchema);

module.exports = UserDTO;
