import express from "express";

import { TeacherController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove, login, resetPassword } =
  TeacherController;

const router = express.Router();

const teacherRouter = {
  LIST_ALL: "/teacher/listAll",
  LIST_BY_ID: "/teacher/listById",
  CREATE: "/teacher/create",
  UPDATE: "/teacher/update",
  REMOVE: "/teacher/remove",
  LOGIN: "/teacher/login",
  RESET_PASSWORD: "/teacher/resetPassword",
};

router.get(teacherRouter.LIST_ALL, validateToken, listAll);
router.get(teacherRouter.LIST_BY_ID, validateToken, listById);
router.post(teacherRouter.CREATE, validateToken, create);
router.put(teacherRouter.UPDATE, validateToken, update);
router.delete(teacherRouter.REMOVE, validateToken, remove);
router.post(teacherRouter.LOGIN, login);
router.post(teacherRouter.RESET_PASSWORD, resetPassword);

export default router;
