import mongoose from "mongoose";

const schemaStudent = {
  code: String,
  fullName: String,
  phone: String,
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
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
};

const Student = mongoose.model("Student", schemaStudent, "students");

export default Student;
