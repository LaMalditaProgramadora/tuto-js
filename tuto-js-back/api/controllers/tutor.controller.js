import { Tutor } from "../models/_index.js";
import { createResponse } from "../utils/response.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.js";

export const login = async (req, res) => {
  const body = req.body;
  let tutor = await Tutor.findOne({
    code: body.code,
  });
  if (!tutor) {
    res.json(createResponse(0, "Código incorrecto", null));
  } else {
    if (comparePassword(body.password, tutor.password)) {
      res.json(createResponse(1, "Login exitoso", tutor));
    } else {
      res.json(createResponse(-1, "Contraseña incorrecta", null));
    }
  }
};

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let tutor = await Tutor.findById(_id);
  res.json(createResponse(1, "Tutor encontrado", tutor));
};

export const listByCode = async (req, res) => {
  const { code: code } = req.query;
  let tutor = await Tutor.findOne({ code: code });
  res.json(createResponse(1, "Tutor encontrado", tutor));
};

export const listAll = async (req, res) => {
  let tutors = await Tutor.find();
  res.json(createResponse(1, "Tutores encontrados", tutors));
};

export const create = async (req, res) => {
  try {
    let tutor = new Tutor(req.body);
    tutor.status = false;
    tutor.pasword = encryptPassword(tutor.password);
    const tutorSave = await tutor.save();
    res.json(createResponse(1, "Registro exitoso", tutorSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const update = async (req, res) => {
  try {
    let tutor = await Tutor.findById(req.body._id);
    tutor.code = req.body.code;
    tutor.fullName = req.body.fullName;
    const tutorSave = await tutor.save();
    res.json(createResponse(1, "Actualización exitosa", tutorSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const tutor = await Tutor.findById(_id);
    if (tutor.tutorships.length === 0) {
      const tutorDelete = await Tutor.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    } else {
      res.json(createResponse(0, "El tutor tiene tutorías", null));
    }
  } catch (e) {
    res.status(createResponse(-1, "Error al eliminar", null));
  }
};
