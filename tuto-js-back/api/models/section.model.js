import mongoose from "mongoose";

const schemaSection = {
  code: String,
  period: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  tutorships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorship",
    },
  ],
};

const Section = mongoose.model("Section", schemaSection, "sections");

export default Section;
