import { Topic } from "../models/_index.js";
import { createResponse } from "../utils/response.js";

export const listById = async (req, res) => {
  const { _id: _id } = req.query;
  let topic = await Topic.findById(_id);
  res.json(createResponse(1, "Tema encontrado", topic));
};

export const listAll = async (req, res) => {
  let topics = await Topic.find();
  res.json(createResponse(1, "Temas encontrados", topics));
};

export const create = async (req, res) => {
  try {
    const topic = new Topic(req.body);
    const topicSave = await topic.save();
    res.json(createResponse(1, "Registro exitoso", topicSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const update = async (req, res) => {
  try {
    let topic = await Topic.findById(req.body._id);
    topic.description = req.body.description;
    const topicSave = await topic.save();
    res.json(createResponse(1, "Actualización exitosa", topicSave));
  } catch (e) {
    res.status(createResponse(-1, "Error al registrar", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const topic = await Topic.findById(_id);
    if (topic.tutorships.length === 0) {
      const topicDelete = await Topic.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    } else {
      res.json(createResponse(0, "El tema tiene tutorías", null));
    }
  } catch (e) {
    res.status(createResponse(-1, "Error al eliminar", null));
  }
};
