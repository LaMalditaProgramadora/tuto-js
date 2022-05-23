import { Course, Tutor } from "../models/_index.js";
import { createResponse } from "../utils/response.js";
import mongoose from "mongoose";

export const listById = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    let course = await Course.findById(_id);
    res.json(createResponse(1, "Curso encontrado", course));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const listAll = async (req, res) => {
  try {
    let courses = await Course.find();
    res.json(createResponse(1, "Cursos encontrados", courses));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const listTutors = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    let course = await Course.findById(_id).populate("tutors");
    res.json(createResponse(1, "Tutores encontrados", course));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const create = async (req, res) => {
  try {
    const course = new Course(req.body);
    const courseSave = await course.save();
    res.json(createResponse(1, "Registro exitoso", courseSave));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const update = async (req, res) => {
  try {
    let course = await Course.findById(req.body._id);
    course.code = req.body.code;
    course.name = req.body.name;
    const courseSave = await course.save();
    res.json(createResponse(1, "Actualización exitosa", courseSave));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const course = await Course.findById(_id).populate('sections').populate('topics').populate('tutors');
    if (course.sections.length !== 0) {
      res.json(createResponse(0, "El curso tiene secciones", null));
    } else if (course.topics.length !== 0) {
      res.json(createResponse(0, "El curso tiene temas", null));
    } else if (course.tutorships.length !== 0) {
      res.json(createResponse(0, "El curso tiene tutorías", null));
    } else if (course.tutors.length !== 0) {
      res.json(createResponse(0, "El curso tiene tutores", null));
    }else {
      const courseDelete = await Course.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    }
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const addTutor = async (req, res) => {
  try {
    const body = req.body;
    const course = await Course.findById(body.idCourse);
    const tutors = course.tutors.map((tutor) => tutor.toString());

    if (tutors.includes(body.idTutor)) {
      res.json(createResponse(0, "Tutor ya agregado", null));
    } else {
      course.tutors.push(body.idTutor);
      const courseSave = await course.save();
      const tutor = await Tutor.findById(body.idTutor);
      tutor.courses.push(body.idCourse);
      const tutorSave = await tutor.save();
      res.json(
        createResponse(1, "Registro exitoso", {
          course: courseSave,
          tutor: tutorSave,
        })
      );
    }
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const removeTutor = async (req, res) => {
  try {
    console.log('removeTutor');
    const { idCourse: idCourse, idTutor: idTutor } = req.query;
    const course = await Course.findById(idCourse);
    course.tutors.pull(mongoose.Types.ObjectId(idTutor));
    const courseSave = await course.save();
    const tutor = await Tutor.findById(idTutor);
    tutor.courses.pull(mongoose.Types.ObjectId(idCourse));
    const tutorSave = await tutor.save();
    res.json(createResponse(1, "Eliminación exitosa", null));
  } catch (e) {
    console.log('error removeTutor');
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};
