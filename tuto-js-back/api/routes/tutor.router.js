import express from "express";

import { TutorController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const {
  listAll,
  listById,
  create,
  update,
  remove,
  login,
  resetPassword,
  listByCourse,
} = TutorController;

const router = express.Router();

const tutorRouter = {
  LIST_ALL: "/tutor/listAll",
  LIST_BY_ID: "/tutor/listById",
  LIST_BY_COURSE: "/tutor/listByCourse",
  CREATE: "/tutor/create",
  UPDATE: "/tutor/update",
  REMOVE: "/tutor/remove",
  LOGIN: "/tutor/login",
  RESET_PASSWORD: "/tutor/resetPassword",
};

router.get(tutorRouter.LIST_ALL, validateToken, listAll);
router.get(tutorRouter.LIST_BY_ID, validateToken, listById);
router.get(tutorRouter.LIST_BY_COURSE, validateToken, listByCourse);
router.post(tutorRouter.CREATE, validateToken, create);
router.put(tutorRouter.UPDATE, validateToken, update);
router.delete(tutorRouter.REMOVE, validateToken, remove);
router.post(tutorRouter.LOGIN, login);
router.post(tutorRouter.RESET_PASSWORD, resetPassword);

export default router;
