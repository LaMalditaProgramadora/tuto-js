import mongoose from "mongoose";

const schemaTeacher = {
  code: String,
  fullName: String,
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
};

const Teacher = mongoose.model("Teacher", schemaTeacher, "teachers");

export default Teacher;
