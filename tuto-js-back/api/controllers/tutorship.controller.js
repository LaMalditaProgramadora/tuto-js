import { Tutorship } from "../models/_index.js";
import { createResponse } from "../utils/response.js";

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let tutorship = await Tutorship.findById(_id);
  res.json(createResponse(1, "Tutoría encontrado", tutorship));
};

export const listAll = async (req, res) => {
  let tutorships = await Tutorship.find();
  res.json(createResponse(1, "Tutorías encontrados", tutorships));
};

export const create = async (req, res) => {
  try {
    let tutorship = new Tutorship(req.body);
    tutorship.attended = false;
    const tutorshipSave = await tutorship.save();
    res.json(createResponse(1, "Registro exitoso", tutorshipSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const update = async (req, res) => {
  try {
    let tutorship = await Tutorship.findById(req.body._id);
    tutorship.attendedDate = req.body.attendedDate;
    tutorship.attended = req.body.attended;
    tutorship.solution = req.body.solution;
    const tutorshipSave = await tutorship.save();
    res.json(createResponse(1, "Actualización exitosa", tutorshipSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const tutorship = await Tutorship.findById(_id);
    res.json(createResponse(1, "Eliminación exitosa", null));
  } catch (e) {
    res.status(createResponse(-1, "Error al eliminar", null));
  }
};
