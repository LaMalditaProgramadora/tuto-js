import { Student } from "../models/_index.js";
import { createResponse } from "../utils/response.js";

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let student = await Student.findById(_id);
  res.json(createResponse(1, "Estudiante encontrado", student));
};

export const listAll = async (req, res) => {
  let students = await Student.find();
  res.json(createResponse(1, "Estudiantes encontrados", students));
};

export const create = async (req, res) => {
  try {
    const student = new Student(req.body);
    const studentSave = await student.save();
    res.json(createResponse(1, "Registro exitoso", studentSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const update = async (req, res) => {
  try {
    let student = await Student.findById(req.body._id);
    student.code = req.body.code;
    student.fullName = req.body.fullName;
    const studentSave = await student.save();
    res.json(createResponse(1, "Actualización exitosa", studentSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const student = await Student.findById(_id);
    if (student.tutorships.length === 0) {
      const studentDelete = await Student.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    } else {
      res.json(createResponse(0, "El estudiante tiene tutorías", null));
    }
  } catch (e) {
    res.status(createResponse(-1, "Error al eliminar", null));
  }
};
