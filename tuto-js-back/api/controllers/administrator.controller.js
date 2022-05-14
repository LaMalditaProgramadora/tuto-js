import { Administrator } from "../models/_index.js";
import { createResponse } from "../utils/response.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req, res) => {
  const body = req.body;
  let administrator = await Administrator.findOne({
    code: body.code,
  });
  if (administrator === null) {
    res.json(createResponse(0, "Código incorrecto", null));
  } else {
    if (administrator.active === false) {
      res.json(createResponse(0, "El administrador no se encuentra activo", null));
    } else {
      if (comparePassword(body.password, administrator.password)) {
        jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 36000,
            _id: administrator._id,
          },
          process.env.SECRET_KEY,
          (error, token) => {
            if (!error) {
              const administratorDto = {
                _id: administrator._id,
                code: administrator.code,
                token: token,
              };
              res.json(createResponse(1, "Login exitoso", administratorDto));
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
  }
};

export const resetPassword = async () => {
  try {
    const { code: code } = req.query;
    let administrator = await Administrator.findOne({ code: code });
    if (administrator === null) {
      res.json(createResponse(0, "No se encontró administrator", {}));
    } else {
      const password = generateString();
      administrator.password = encryptPassword(password);
      const administratorSave = await administrator.save();
      const result = await sendMail(administrator.email, password);
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

export const create = async (req, res) => {
  try {
    let administrator = new Administrator(req.body);
    administrator.password = encryptPassword(administrator.password);
    administrator.active = false;
    const administratorSave = await administrator.save();
    res.json(createResponse(1, "Registro exitoso", null));
  } catch (e) {
    console.log(e);
    res.json(createResponse(-1, "Error al registrar", null));
  }
};
