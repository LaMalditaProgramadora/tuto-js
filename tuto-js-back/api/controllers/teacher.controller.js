import { Teacher } from "../models/_index.js";
import { createResponse } from "../utils/response.js";

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let teacher = await Teacher.findById(_id);
  res.json(createResponse(1, "Profesor encontrado", teacher));
};

export const listAll = async (req, res) => {
  let teachers = await Teacher.find();
  res.json(createResponse(1, "Profesores encontrados", teachers));
};

export const create = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    const teacherSave = await teacher.save();
    res.json(createResponse(1, "Registro exitoso", teacherSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const update = async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.body._id);
    teacher.code = req.body.code;
    teacher.fullName = req.body.fullName;
    const teacherSave = await teacher.save();
    res.json(createResponse(1, "Actualización exitosa", teacherSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const teacher = await Teacher.findById(_id);
    if (teacher.sections.length === 0) {
      const teacherDelete = await Teacher.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    } else {
      res.json(createResponse(0, "El profesor tiene secciones", null));
    }
  } catch (e) {
    res.status(createResponse(-1, "Error al eliminar", null));
  }
};
