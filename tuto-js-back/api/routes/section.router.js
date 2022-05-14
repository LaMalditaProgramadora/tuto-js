import express from "express";

import { SectionController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const {
  listAll,
  listById,
  create,
  update,
  remove,
  addStudent,
  listStudents,
  removeStudent,
  listByCourse,
  listByStudent
} = SectionController;

const router = express.Router();

const sectionRouter = {
  LIST_ALL: "/section/listAll",
  LIST_BY_ID: "/section/listById",
  LIST_BY_COURSE: "/section/listByCourse",
  LIST_BY_STUDENT: "/section/listByStudent",
  CREATE: "/section/create",
  UPDATE: "/section/update",
  REMOVE: "/section/remove",
  ADD_STUDENT: "/section/addStudent",
  LIST_STUDENTS: "/section/listStudents",
  REMOVE_STUDENT: "/section/removeStudent",
};

router.get(sectionRouter.LIST_ALL, listAll);
router.get(sectionRouter.LIST_BY_ID, listById);
router.get(sectionRouter.LIST_BY_COURSE, listByCourse);
router.get(sectionRouter.LIST_BY_STUDENT, listByStudent);
router.post(sectionRouter.CREATE, create);
router.put(sectionRouter.UPDATE, update);
router.delete(sectionRouter.REMOVE, remove);
router.post(sectionRouter.ADD_STUDENT, addStudent);
router.get(sectionRouter.LIST_STUDENTS, listStudents);
router.delete(sectionRouter.REMOVE_STUDENT, removeStudent);

export default router;
