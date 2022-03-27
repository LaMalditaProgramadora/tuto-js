import express from "express";

import { TutorshipController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove } = TutorshipController;

const router = express.Router();

const tutorshipRouter = {
  LIST_ALL: "/tutorship/listAll",
  LIST_BY_ID: "/tutorship/listById",
  CREATE: "/tutorship/create",
  UPDATE: "/tutorship/update",
  REMOVE: "/tutorship/remove",
};

router.get(tutorshipRouter.LIST_ALL, listAll);
router.get(tutorshipRouter.LIST_BY_ID, listById);
router.post(tutorshipRouter.CREATE, create);
router.put(tutorshipRouter.UPDATE, update);
router.delete(tutorshipRouter.REMOVE, remove);

export default router;
