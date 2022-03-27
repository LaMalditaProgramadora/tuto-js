import mongoose from "mongoose";

const schemaCourse = {
  code: String,
  name: String,
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
  ],
  tutors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
    },
  ],
};

const Course = mongoose.model("Course", schemaCourse, "courses");

export default Course;
