import { Section } from "../models/_index.js";
import { createResponse } from "../utils/response.js";

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let section = await Section.findById(_id)
    .populate("teacher")
    .populate("course");
  res.json(createResponse(1, "Sección encontrado", section));
};

export const listAll = async (req, res) => {
  let sections = await Section.find().populate("teacher").populate("course");
  res.json(createResponse(1, "Secciones encontrados", sections));
};

export const create = async (req, res) => {
  try {
    const section = new Section(req.body);
    const sectionSave = await section.save();
    res.json(createResponse(1, "Registro exitoso", sectionSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
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
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const section = await Section.findById(_id);
    if (section.students.length === 0) {
      const sectionDelete = await Section.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    } else {
      res.json(createResponse(0, "La sección tiene estudiantes", null));
    }
  } catch (e) {
    res.status(createResponse(-1, "Error al eliminar", null));
  }
};
