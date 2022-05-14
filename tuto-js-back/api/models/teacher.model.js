import mongoose from "mongoose";

const schemaTeacher = {
  code: String,
  fullName: String,
  email: String,
  password: String,
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  tutorships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorship",
    },
  ],
};

const Teacher = mongoose.model("Teacher", schemaTeacher, "teachers");

export default Teacher;
