import { Section, Student, Teacher, Course } from "../models/_index.js";
import { createResponse } from "../utils/response.js";
import mongoose from "mongoose";

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let section = await Section.findById(_id)
    .populate("teacher")
    .populate("course");
  res.json(createResponse(1, "Sección encontrada", section));
};

export const listAll = async (req, res) => {
  let sections = await Section.find().populate("teacher").populate("course");
  res.json(createResponse(1, "Secciones encontradas", sections));
};

export const listByCourse = async (req, res) => {
  const { _id: _id } = req.query;
  let sections = await Section.find({
    course: mongoose.Types.ObjectId(_id),
  }).populate("course");
  res.json(createResponse(1, "Secciones encontradas", sections));
};

export const listByStudent = async (req, res) => {
  const { _id: _id } = req.query;
  let sections = await Section.find({
    students: [mongoose.Types.ObjectId(_id)],
  }).populate("course").populate("teacher");
  res.json(createResponse(1, "Secciones encontradas", sections));
};

export const listStudents = async (req, res) => {
  const { _id: _id } = req.query;
  let section = await Section.findById(_id).populate("students");
  res.json(createResponse(1, "Estudiantes encontrados", section));
};

export const create = async (req, res) => {
  try {
    const section = new Section(req.body);
    const sectionSave = await section.save();

    const teacher = await Teacher.findById(section.teacher);
    teacher.sections.push(sectionSave._id);
    const teacherSave = await teacher.save();

    const course = await Course.findById(section.course);
    course.sections.push(sectionSave._id);
    const courseSave = await course.save();

    res.json(createResponse(1, "Registro exitoso", sectionSave));
  } catch (e) {
    res.json(createResponse(-1, "Error al registrar", null));
  }
};

export const update = async (req, res) => {
  try {
    let section = await Section.findById(req.body._id);
    section.code = req.body.code;
    section.period = req.body.period;
    section.course = req.body.course;
    section.teacher = req.body.teacher;
    const sectionSave = await section.save();
    res.json(createResponse(1, "Actualización exitosa", sectionSave));
  } catch (e) {
    res.json(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const section = await Section.findById(_id);

    if (section.students.length !== 0) {
      res.json(createResponse(-1, "La sección tiene estudiantes", null));
    } else if (section.tutorships.length !== 0) {
      res.json(createResponse(-1, "La sección tiene tutorías", null));
    } else {
      const teachers = await Teacher.find({
        sections: [mongoose.Types.ObjectId(_id)],
      });
      for (let i = 0; i < teachers.length; i++) {
        teachers[i].sections.pull(mongoose.Types.ObjectId(_id));
        const teacherSave = await teachers[i].save();
      }
      const courses = await Course.find({
        sections: [mongoose.Types.ObjectId(_id)],
      });
      for (let i = 0; i < courses.length; i++) {
        courses[i].sections.pull(mongoose.Types.ObjectId(_id));
        const courseSave = await courses[i].save();
      }
      const sectionDelete = await Section.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    }
  } catch (e) {
    res.json(createResponse(-1, "Error al eliminar", null));
  }
};

export const addStudent = async (req, res) => {
  try {
    const body = req.body;
    const section = await Section.findById(body.idSection);
    const students = section.students.map((student) => student.toString());
    if (students.includes(body.idStudent)) {
      res.json(createResponse(-1, "Estudiante ya agregado", null));
    } else {
      section.students.push(body.idStudent);
      const sectionSave = await section.save();

      const student = await Student.findById(body.idStudent);
      student.sections.push(body.idSection);
      student.courses.push(section.course);
      const studentSave = await student.save();

      res.json(
        createResponse(1, "Registro exitoso", {
          section: sectionSave,
          student: studentSave,
        })
      );
    }
  } catch (e) {
    res.json(createResponse(-1, "Error al agregar estudiante", null));
  }
};

export const removeStudent = async (req, res) => {
  try {
    const { idSection: idSection, idStudent: idStudent } = req.query;

    const section = await Section.findById(idSection);
    section.students.pull(mongoose.Types.ObjectId(idStudent));
    const sectionSave = await section.save();

    const student = await Student.findById(idStudent);
    student.sections.pull(mongoose.Types.ObjectId(idSection));
    student.courses.pull(mongoose.Types.ObjectId(section.course));
    const studentSave = await student.save();

    res.json(createResponse(1, "Eliminación exitosa", null));
  } catch (e) {
    res.json(createResponse(-1, "Error al eliminar", null));
  }
};
