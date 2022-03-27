import express from "express";

import { SectionController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove } = SectionController;

const router = express.Router();

const sectionRouter = {
  LIST_ALL: "/section/listAll",
  LIST_BY_ID: "/section/listById",
  CREATE: "/section/create",
  UPDATE: "/section/update",
  REMOVE: "/section/remove",
};

router.get(sectionRouter.LIST_ALL, listAll);
router.get(sectionRouter.LIST_BY_ID, listById);
router.post(sectionRouter.CREATE, create);
router.put(sectionRouter.UPDATE, update);
router.delete(sectionRouter.REMOVE, remove);

export default router;
