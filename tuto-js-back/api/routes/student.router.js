import express from "express";
import { listCourses } from "../controllers/student.controller.js";

import { StudentController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove, login, resetPassword } =
  StudentController;

const router = express.Router();

const studentRouter = {
  LIST_ALL: "/student/listAll",
  LIST_BY_ID: "/student/listById",
  LIST_COURSES: "/student/listCourses",
  CREATE: "/student/create",
  UPDATE: "/student/update",
  REMOVE: "/student/remove",
  LOGIN: "/student/login",
  RESET_PASSWORD: "/student/resetPassword",
};

router.get(studentRouter.LIST_ALL, validateToken, listAll);
router.get(studentRouter.LIST_BY_ID, validateToken, listById);
router.get(studentRouter.LIST_COURSES, validateToken, listCourses);
router.post(studentRouter.CREATE, validateToken, create);
router.put(studentRouter.UPDATE, validateToken, update);
router.delete(studentRouter.REMOVE, validateToken, remove);
router.post(studentRouter.LOGIN, login);
router.post(studentRouter.RESET_PASSWORD, resetPassword);

export default router;
