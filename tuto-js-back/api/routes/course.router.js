import express from "express";

import { CourseController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove } = CourseController;

const router = express.Router();

const courseRouter = {
  LIST_ALL: "/course/listAll",
  LIST_BY_ID: "/course/listById",
  CREATE: "/course/create",
  UPDATE: "/course/update",
  REMOVE: "/course/remove",
};

router.get(courseRouter.LIST_ALL, listAll);
router.get(courseRouter.LIST_BY_ID, listById);
router.post(courseRouter.CREATE, create);
router.put(courseRouter.UPDATE, update);
router.delete(courseRouter.REMOVE, remove);

export default router;
