import express from "express";

import { StudentController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove } = StudentController;

const router = express.Router();

const studentRouter = {
  LIST_ALL: "/student/listAll",
  LIST_BY_ID: "/student/listById",
  CREATE: "/student/create",
  UPDATE: "/student/update",
  REMOVE: "/student/remove",
};

router.get(studentRouter.LIST_ALL, listAll);
router.get(studentRouter.LIST_BY_ID, listById);
router.post(studentRouter.CREATE, create);
router.put(studentRouter.UPDATE, update);
router.delete(studentRouter.REMOVE, remove);

export default router;