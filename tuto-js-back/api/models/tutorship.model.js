import mongoose from "mongoose";

const schemaTutorship = {
  registerDate: String,
  attendedDate: String,
  attended: Boolean,
  reason: String,
  solution: String,
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
};

const Tutorship = mongoose.model("Tutorship", schemaTutorship, "tutorships");

export default Tutorship;
