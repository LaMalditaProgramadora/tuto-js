import {
  Tutorship,
  Tutor,
  Section,
  Topic,
  Student,
  Course,
  Teacher,
} from "../models/_index.js";
import { createResponse } from "../utils/response.js";
import mongoose from "mongoose";

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let tutorship = await Tutorship.findById(_id);
  res.json(createResponse(1, "Tutoría encontrada", tutorship));
};

export const listAll = async (req, res) => {
  let tutorships = await Tutorship.find()
    .populate("course")
    .populate("section")
    .populate("topic")
    .populate("tutor")
    .populate("student");
  res.json(createResponse(1, "Tutorías encontradas", tutorships));
};

export const listByStudent = async (req, res) => {
  const { _id: _id } = req.query;
  let tutorships = await Tutorship.find({ student: _id })
    .populate("course")
    .populate("section")
    .populate("topic")
    .populate("tutor")
    .populate("student");
  res.json(createResponse(1, "Tutorías encontradas", tutorships));
};

export const listByTutor = async (req, res) => {
  const { _id: _id } = req.query;
  let tutorships = await Tutorship.find({ tutor: _id })
    .populate("course")
    .populate("section")
    .populate("topic")
    .populate("tutor")
    .populate("student");
  res.json(createResponse(1, "Tutorías encontradas", tutorships));
};

export const listByTeacher = async (req, res) => {
  const { _id: _id } = req.query;
  let tutorships = await Tutorship.find({ teacher: _id })
    .populate("course")
    .populate("section")
    .populate("topic")
    .populate("tutor")
    .populate("student");
  res.json(createResponse(1, "Tutorías encontradas", tutorships));
};

export const create = async (req, res) => {
  try {
    let tutorship = new Tutorship(req.body);
    const tutorshipSave = await tutorship.save();

    const tutor = await Tutor.findById(tutorship.tutor);
    tutor.tutorships.push(tutorshipSave._id);
    const tutorSave = await tutor.save();

    const section = await Section.findById(tutorship.section);
    section.tutorships.push(tutorshipSave._id);
    const sectionSave = await section.save();

    const topic = await Topic.findById(tutorship.topic);
    topic.tutorships.push(tutorshipSave._id);
    const topicSave = await topic.save();

    const student = await Student.findById(tutorship.student);
    student.tutorships.push(tutorshipSave._id);
    const studentSave = await student.save();

    const course = await Course.findById(tutorship.course);
    course.tutorships.push(tutorshipSave._id);
    const courseSave = await course.save();

    const teacher = await Teacher.findById(tutorship.teacher);
    teacher.tutorships.push(tutorshipSave._id);
    const teacherSave = await teacher.save();

    res.json(createResponse(1, "Registro exitoso", tutorshipSave));
  } catch (e) {
    res.json(createResponse(-1, "Error al registrar", null));
  }
};

export const update = async (req, res) => {
  try {
    let tutorship = await Tutorship.findById(req.body._id);
    tutorship.attendedDate = req.body.attendedDate;
    tutorship.solution = req.body.solution;
    tutorship.attended = req.body.attended;
    const tutorshipSave = await tutorship.save();
    res.json(createResponse(1, "Actualización exitosa", tutorshipSave));
  } catch (e) {
    res.json(createResponse(-1, "Error al actualizar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const tutorship = await Tutorship.findById(_id);

    const tutor = await Tutor.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    tutor.tutorships.pull(mongoose.Types.ObjectId(_id));
    const tutorSave = await tutor.save();

    const section = await Section.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    section.tutorships.pull(mongoose.Types.ObjectId(_id));
    const sectionSave = await section.save();

    const topic = await Topic.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    topic.tutorships.pull(mongoose.Types.ObjectId(_id));
    const topicSave = await topic.save();

    const student = await Student.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    student.tutorships.pull(mongoose.Types.ObjectId(_id));
    const studentSave = await student.save();

    const course = await Course.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    course.tutorships.pull(mongoose.Types.ObjectId(_id));
    const courseSave = await course.save();

    const teacher = await Teacher.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    teacher.tutorships.pull(mongoose.Types.ObjectId(_id));
    const teacherSave = await teacher.save();

    const tutorshipDelete = await Tutorship.deleteOne({ _id: _id });
    res.json(createResponse(1, "Eliminación exitosa", null));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al eliminar", null));
  }
};
