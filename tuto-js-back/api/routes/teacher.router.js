import express from "express";

import { TeacherController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove } = TeacherController;

const router = express.Router();

const teacherRouter = {
  LIST_ALL: "/teacher/listAll",
  LIST_BY_ID: "/teacher/listById",
  CREATE: "/teacher/create",
  UPDATE: "/teacher/update",
  REMOVE: "/teacher/remove",
};

router.get(teacherRouter.LIST_ALL, listAll);
router.get(teacherRouter.LIST_BY_ID, listById);
router.post(teacherRouter.CREATE, create);
router.put(teacherRouter.UPDATE, update);
router.delete(teacherRouter.REMOVE, remove);

export default router;