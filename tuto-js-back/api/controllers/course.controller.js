import { Course } from "../models/_index.js";
import { createResponse } from "../utils/response.js";

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let course = await Course.findById(_id);
  res.json(createResponse(1, "Curso encontrado", course));
};

export const listAll = async (req, res) => {
  let courses = await Course.find();
  res.json(createResponse(1, "Cursos encontrados", courses));
};

export const create = async (req, res) => {
  try {
    const course = new Course(req.body);
    const courseSave = await course.save();
    res.json(createResponse(1, "Registro exitoso", courseSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
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
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const course = await Course.findById(_id);
    if (course.sections.length === 0) {
      const courseDelete = await Course.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    } else {
      res.json(createResponse(0, "El curso tiene secciones", null));
    }
  } catch (e) {
    res.status(createResponse(-1, "Error al eliminar", null));
  }
};
