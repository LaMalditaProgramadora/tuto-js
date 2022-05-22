import { Teacher } from "../models/_index.js";
import { createResponse } from "../utils/response.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.js";
import { generateString } from "../utils/randomString.js";
import { sendMail } from "../utils/emailSender.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req, res) => {
  const body = req.body;
  let teacher = await Teacher.findOne({
    code: body.code,
  });
  if (teacher === null) {
    res.json(createResponse(0, "Código incorrecto", null));
  } else {
    if (comparePassword(body.password, teacher.password)) {
      jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 36000, _id: teacher._id },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            const teacherDto = {
              _id: teacher._id,
              code: teacher.code,
              token: token,
            };
            res.json(createResponse(1, "Login exitoso", teacherDto));
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
  let teacher = await Teacher.findById(_id).select("-password");
  res.json(createResponse(1, "Profesor encontrado", teacher));
};

export const listAll = async (req, res) => {
  let teachers = await Teacher.find().select("-password");
  res.json(createResponse(1, "Profesores encontrados", teachers));
};

export const create = async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    teacher.password = encryptPassword(teacher.password);
    const teacherSave = await teacher.save();
    res.json(createResponse(1, "Registro exitoso", null));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al registrar", null));
  }
};

export const resetPassword = async (req, res) => {
  try {
    const code = req.body.code;
    let teacher = await Teacher.findOne({ code: code });
    if (teacher === null) {
      res.json(createResponse(0, "No se encontró teacher", null));
    } else {
      const password = generateString();
      teacher.password = encryptPassword(password);
      const teacherSave = await teacher.save();
      const result = await sendMail(teacher.email, password);
      if (result === true) {
        res.json(createResponse(1, "Envío exitoso", null));
      } else {
        res.json(createResponse(-1, "Error al enviar correo", null));
      }
    }
  } catch(e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const update = async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.body._id);
    teacher.code = req.body.code;
    teacher.fullName = req.body.fullName;
    teacher.email = req.body.email;
    const teacherSave = await teacher.save();
    res.json(createResponse(1, "Actualización exitosa", null));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const teacher = await Teacher.findById(_id);
    if (teacher.sections.length !== 0) {
      res.json(createResponse(0, "El profesor tiene secciones", null));
    } else if (teacher.tutorships.length !== 0) {
      res.json(createResponse(0, "El profesor tiene tutorías", null));
    } else {
      const teacherDelete = await Teacher.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    }
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al eliminar", null));
  }
};
