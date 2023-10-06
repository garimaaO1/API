const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Post", PostSchema);
  