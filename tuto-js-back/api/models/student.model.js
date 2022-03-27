import mongoose from "mongoose";

const schemaStudent = {
  code: String,
  fullName: String,
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

const Student = mongoose.model("Student", schemaStudent, "students");

export default Student;
