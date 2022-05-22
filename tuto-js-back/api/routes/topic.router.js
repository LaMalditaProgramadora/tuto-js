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

router.get(topicRouter.LIST_ALL, validateToken, listAll);
router.get(topicRouter.LIST_BY_ID, validateToken, listById);
router.get(topicRouter.LIST_BY_COURSE, validateToken, listByCourse);
router.post(topicRouter.CREATE, validateToken, create);
router.put(topicRouter.UPDATE, validateToken, update);
router.delete(topicRouter.REMOVE, validateToken, remove);

export default router;
