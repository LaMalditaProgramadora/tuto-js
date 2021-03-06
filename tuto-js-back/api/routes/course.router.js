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
  ADD_TUTOR: "/course/addTutor",
  LIST_TUTORS: "/course/listTutors",
  REMOVE_TUTOR: "/course/removeTutor",
};

router.get(courseRouter.LIST_ALL, validateToken, listAll);
router.get(courseRouter.LIST_BY_ID, validateToken, listById);
router.post(courseRouter.CREATE, validateToken, create);
router.put(courseRouter.UPDATE, validateToken, update);
router.delete(courseRouter.REMOVE, validateToken, remove);
router.post(courseRouter.ADD_TUTOR, validateToken, addTutor);
router.get(courseRouter.LIST_TUTORS, validateToken, listTutors);
router.delete(courseRouter.REMOVE_TUTOR, validateToken, removeTutor);

export default router;
