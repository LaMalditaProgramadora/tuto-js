import express from "express";

import { CourseController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const {
  listAll,
  listById,
  create,
  update,
  remove,
  addTutor,
  listTutors,
  removeTutor,
} = CourseController;

const router = express.Router();

const courseRouter = {
  LIST_ALL: "/course/listAll",
  LIST_BY_ID: "/course/listById",
  CREATE: "/course/create",
  UPDATE: "/course/update",
  REMOVE: "/course/remove",
  ADD_TUTOR: "/section/addTutor",
  LIST_TUTORS: "/section/listTutors",
  REMOVE_TUTOR: "/section/removeTutor",
};

router.get(courseRouter.LIST_ALL, listAll);
router.get(courseRouter.LIST_BY_ID, listById);
router.post(courseRouter.CREATE, create);
router.put(courseRouter.UPDATE, update);
router.delete(courseRouter.REMOVE, remove);
router.post(courseRouter.ADD_TUTOR, addTutor);
router.get(courseRouter.LIST_TUTORS, listTutors);
router.delete(courseRouter.REMOVE_TUTOR, removeTutor);

export default router;
