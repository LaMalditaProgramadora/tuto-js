import express from "express";

import { TutorController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove, login, listByCode } =
  TutorController;

const router = express.Router();

const tutorRouter = {
  LIST_ALL: "/tutor/listAll",
  LIST_BY_ID: "/tutor/listById",
  CREATE: "/tutor/create",
  UPDATE: "/tutor/update",
  REMOVE: "/tutor/remove",
  LOGIN: "/tutor/login",
  LIST_BY_CODE: "/tutor/listByCode",
};

router.get(tutorRouter.LIST_BY_CODE, listByCode);
router.get(tutorRouter.LIST_ALL, listAll);
router.get(tutorRouter.LIST_BY_ID, listById);
router.post(tutorRouter.CREATE, create);
router.put(tutorRouter.UPDATE, update);
router.delete(tutorRouter.REMOVE, remove);
router.post(tutorRouter.LOGIN, login);

export default router;
