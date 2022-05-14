import mongoose from "mongoose";

const schemaTutorship = {
  registerDate: Date,
  attendedDate: Date,
  attended: Boolean,
  reason: String,
  solution: String,
  image: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
};

const Tutorship = mongoose.model("Tutorship", schemaTutorship, "tutorships");

export default Tutorship;
