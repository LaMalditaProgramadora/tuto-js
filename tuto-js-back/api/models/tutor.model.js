import mongoose from "mongoose";

const schemaTutor = {
  code: String,
  fullName: String,
  password: String,
  status: Boolean,
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  tutorships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorship",
    },
  ],
};

const Tutor = mongoose.model("Tutor", schemaTutor, "tutors");

export default Tutor;
