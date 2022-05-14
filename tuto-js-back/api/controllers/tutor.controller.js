import { Tutor } from "../models/_index.js";
import { createResponse } from "../utils/response.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

export const login = async (req, res) => {
  const body = req.body;
  let tutor = await Tutor.findOne({
    code: body.code,
  });
  if (tutor === null) {
    res.json(createResponse(0, "Código incorrecto", null));
  } else {
    if (comparePassword(body.password, tutor.password)) {
      jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 36000, _id: tutor._id },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            const tutorDto = {
              _id: tutor._id,
              code: tutor.code,
              token: token,
            };
            res.json(createResponse(1, "Login exitoso", tutorDto));
          } else {
            console.log(error);
            res.json(createResponse(-1, "Error en token", null));
          }
        }
      );
    } else {
      res.json(createResponse(-1, "Contraseña incorrecta", null));
    }
  }
};

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let tutor = await Tutor.findById(_id).select("-password");
  res.json(createResponse(1, "Tutor encontrado", tutor));
};

export const listAll = async (req, res) => {
  let tutors = await Tutor.find().select("-password");
  res.json(createResponse(1, "Tutores encontrados", tutors));
};

export const listByCourse = async (req, res) => {
  const { _id: _id } = req.query;
  let tutor = await Tutor.find({
    courses: [mongoose.Types.ObjectId(_id)],
  }).select("-password");
  res.json(createResponse(1, "Tutores encontrados", tutor));
};

export const create = async (req, res) => {
  try {
    let tutor = new Tutor(req.body);
    tutor.password = encryptPassword(tutor.password);
    const tutorSave = await tutor.save();
    res.json(createResponse(1, "Registro exitoso", null));
  } catch (e) {
    res.json(createResponse(-1, "Error al registrar", null));
  }
};

export const resetPassword = async () => {
  try {
    const { code: code } = req.query;
    let tutor = await Tutor.findOne({ code: code });
    if (tutor === null) {
      res.json(createResponse(0, "No se encontró tutor", {}));
    } else {
      const password = generateString();
      tutor.password = encryptPassword(password);
      const tutorSave = await tutor.save();
      const result = await sendMail(tutor.email, password);
      if (result === true) {
        res.json(createResponse(1, "Envío exitoso", {}));
      } else {
        res.json(createResponse(-1, "Error al enviar correo", {}));
      }
    }
  } catch {
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const update = async (req, res) => {
  try {
    let tutor = await Tutor.findById(req.body._id);
    tutor.code = req.body.code;
    tutor.fullName = req.body.fullName;
    tutor.email = req.body.email;
    const tutorSave = await tutor.save();
    res.json(createResponse(1, "Actualización exitosa", null));
  } catch (e) {
    res.json(createResponse(-1, "Error al registrar", null));
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
    res.json(createResponse(-1, "Error al eliminar", null));
  }
};
