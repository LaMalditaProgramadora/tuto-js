import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Section, Student } from "../models/_index.js";
import { comparePassword, encryptPassword } from "../utils/encrypt.js";
import { createResponse } from "../utils/response.js";
import { generateString } from "../utils/randomString.js";
import { sendMail } from "../utils/emailSender.js";

dotenv.config();

export const login = async (req, res) => {
  const body = req.body;
  let student = await Student.findOne({
    code: body.code,
  });
  if (student === null) {
    res.json(createResponse(0, "Código incorrecto", null));
  } else {
    if (comparePassword(body.password, student.password)) {
      jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 36000, _id: student._id },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            const studentDto = {
              _id: student._id,
              code: student.code,
              token: token,
            };
            res.json(createResponse(1, "Login exitoso", studentDto));
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
  let student = await Student.findById(_id).select("-password");
  res.json(createResponse(1, "Estudiante encontrado", student));
};

export const listAll = async (req, res) => {
  let students = await Student.find().select("-password");
  res.json(createResponse(1, "Estudiantes encontrados", students));
};

export const listCourses = async (req, res) => {
  const { _id: _id } = req.query;
  let student = await Student.findById(_id)
    .select("-password")
    .populate("courses");
  res.json(createResponse(1, "Estudiante encontrado", student));
};

export const create = async (req, res) => {
  try {
    const student = new Student(req.body);
    student.password = encryptPassword(student.password);
    const studentSave = await student.save();
    res.json(createResponse(1, "Registro exitoso", null));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al registrar", null));
  }
};

export const resetPassword = async (req, res) => {
  try {
    const code = req.body.code;
    let student = await Student.findOne({ code: code });
    if (student === null) {
      res.json(createResponse(0, "No se encontró estudiante", null));
    } else {
      const password = generateString();
      student.password = encryptPassword(password);
      const studentSave = await student.save();
      const result = await sendMail(student.email, password);
      if (result === true) {
        res.json(createResponse(1, "Envío exitoso", null));
      } else {
        res.json(createResponse(-1, "Error al enviar correo", null));
      }
    }
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const update = async (req, res) => {
  try {
    let student = await Student.findById(req.body._id);
    student.code = req.body.code;
    student.fullName = req.body.fullName;
    student.phone = req.body.phone;
    student.email = req.body.email;
    const studentSave = await student.save();
    res.json(createResponse(1, "Actualización exitosa", null));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const student = await Student.findById(_id);
    if (student.tutorships.length === 0) {
      if (student.sections.length !== 0) {
        console.log("Remove");
        const sections = await Section.find({
          students: [mongoose.Types.ObjectId(_id)],
        });
        for (let i = 0; i < sections.length; i++) {
          sections[i].students.pull(mongoose.Types.ObjectId(_id));
          const sectionSave = await sections[i].save();
        }
      }
      const studentDelete = await Student.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    } else {
      res.json(createResponse(0, "El estudiante tiene tutorías", null));
    }
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al eliminar", null));
  }
};
