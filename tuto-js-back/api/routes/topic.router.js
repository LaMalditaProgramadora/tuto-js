import express from "express";

import { TopicController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { listAll, listById, create, update, remove, listByCourse } =
  TopicController;

const router = express.Router();

const topicRouter = {
  LIST_ALL: "/topic/listAll",
  LIST_BY_ID: "/topic/listById",
  LIST_BY_COURSE: "/topic/listByCourse",
  CREATE: "/topic/create",
  UPDATE: "/topic/update",
  REMOVE: "/topic/remove",
};

router.get(topicRouter.LIST_ALL, listAll);
router.get(topicRouter.LIST_BY_ID, listById);
router.get(topicRouter.LIST_BY_COURSE, listByCourse);
router.post(topicRouter.CREATE, create);
router.put(topicRouter.UPDATE, update);
router.delete(topicRouter.REMOVE, remove);

export default router;
