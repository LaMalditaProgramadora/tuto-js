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
  try {
    const { _id: _id } = req.query;
    let tutorship = await Tutorship.findById(_id);
    res.json(createResponse(1, "Tutoría encontrada", tutorship));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const listAll = async (req, res) => {
  try {
    let tutorships = await Tutorship.find()
      .populate("course")
      .populate("section")
      .populate("topic")
      .populate("tutor")
      .populate("student");
    res.json(createResponse(1, "Tutorías encontradas", tutorships));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const listByStudent = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    let tutorships = await Tutorship.find({ student: _id })
      .populate("course")
      .populate("section")
      .populate("topic")
      .populate("tutor")
      .populate("student");
    res.json(createResponse(1, "Tutorías encontradas", tutorships));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const listByTutor = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    let tutorships = await Tutorship.find({ tutor: _id })
      .populate("course")
      .populate("section")
      .populate("topic")
      .populate("tutor")
      .populate("student");
    res.json(createResponse(1, "Tutorías encontradas", tutorships));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const listByTeacher = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    let tutorships = await Tutorship.find({ teacher: _id })
      .populate("course")
      .populate("section")
      .populate("topic")
      .populate("tutor")
      .populate("student");
    res.json(createResponse(1, "Tutorías encontradas", tutorships));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
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
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
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
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const tutorship = await Tutorship.findById(_id);

    const tutors = await Tutor.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    for (let i = 0; i < tutors.length; i++) {
      tutors[i].tutorships.pull(mongoose.Types.ObjectId(_id));
      const tutorSave = await tutors[i].save();
    }

    const sections = await Section.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    for (let i = 0; i < sections.length; i++) {
      sections[i].tutorships.pull(mongoose.Types.ObjectId(_id));
      const sectionSave = await sections[i].save();
    }

    const topics = await Topic.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    for (let i = 0; i < topics.length; i++) {
      topics[i].tutorships.pull(mongoose.Types.ObjectId(_id));
      const topicSave = await topics[i].save();
    }

    const students = await Student.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    for (let i = 0; i < students.length; i++) {
      students[i].tutorships.pull(mongoose.Types.ObjectId(_id));
      const studentSave = await students[i].save();
    }

    const courses = await Course.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    for (let i = 0; i < courses.length; i++) {
      courses[i].tutorships.pull(mongoose.Types.ObjectId(_id));
      const courseSave = await courses[i].save();
    }

    const teachers = await Teacher.find({
      tutorships: [mongoose.Types.ObjectId(_id)],
    });
    for (let i = 0; i < teachers.length; i++) {
      teachers[i].tutorships.pull(mongoose.Types.ObjectId(_id));
      const teacherSave = await teachers[i].save();
    }

    const tutorshipDelete = await Tutorship.deleteOne({ _id: _id });
    res.json(createResponse(1, "Eliminación exitosa", null));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};
