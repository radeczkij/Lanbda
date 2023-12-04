import mongoose from "mongoose";

const Data = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  hobbies: [
    {
      type: String,
    },
  ],
});

export default mongoose.model("Data", Data);
