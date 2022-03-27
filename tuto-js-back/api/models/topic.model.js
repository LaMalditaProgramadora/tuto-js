import mongoose from "mongoose";

const schemaTopic = {
  description: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  tutorships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorship",
    },
  ],
};

const Topic = mongoose.model("Topic", schemaTopic, "topics");

export default Topic;
