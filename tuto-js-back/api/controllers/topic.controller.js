import { Topic, Course } from "../models/_index.js";
import { createResponse } from "../utils/response.js";
import mongoose from "mongoose";

export const listById = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    let topic = await Topic.findById(_id).populate("course");
    res.json(createResponse(1, "Tema encontrado", topic));
  } catch (e) {
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const listAll = async (req, res) => {
  try {
    let topics = await Topic.find().populate("course");
    res.json(createResponse(1, "Temas encontrados", topics));
  } catch (e) {
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const listByCourse = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    let topics = await Topic.find({ course: _id });
    res.json(createResponse(1, "Temas encontrados", topics));
  } catch (e) {
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const create = async (req, res) => {
  try {
    const topic = new Topic(req.body);
    const topicSave = await topic.save();

    const course = await Course.findById(topic.course);
    course.topics.push(topicSave._id);
    const courseSave = await course.save();

    res.json(createResponse(1, "Registro exitoso", topicSave));
  } catch (e) {
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const update = async (req, res) => {
  try {
    let topic = await Topic.findById(req.body._id);
    topic.description = req.body.description;
    const topicSave = await topic.save();
    res.json(createResponse(1, "Actualización exitosa", topicSave));
  } catch (e) {
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};

export const remove = async (req, res) => {
  try {
    const { _id: _id } = req.query;
    const topic = await Topic.findById(_id);
    if (topic.tutorships.length === 0) {
      const courses = await Course.find({
        topics: [mongoose.Types.ObjectId(_id)],
      });
      console.log(courses)
      for (let i = 0; i < courses.length; i++) {
        courses[i].topics.pull(mongoose.Types.ObjectId(_id));
        const courseSave = await courses[i].save();
      }
      const topicDelete = await Topic.deleteOne({ _id: _id });
      res.json(createResponse(1, "Eliminación exitosa", null));
    } else {
      res.json(createResponse(0, "El tema tiene tutorías", null));
    }
  } catch (e) {
    console.log("error Remove");
    console.log(e);
    res.json(createResponse(-1, "Error en el servidor", null));
  }
};
