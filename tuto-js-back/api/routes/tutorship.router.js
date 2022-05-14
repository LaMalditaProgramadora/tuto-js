import express from "express";

import { TutorshipController, ImageController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";
import multer from "multer";

const fileUpload = multer();

const {
  listAll,
  listById,
  create,
  update,
  remove,
  listByStudent,
  listByTeacher,
  listByTutor,
} = TutorshipController;

const { uploadTutorshipImage } = ImageController;

const router = express.Router();

const tutorshipRouter = {
  LIST_ALL: "/tutorship/listAll",
  LIST_BY_STUDENT: "/tutorship/listByStudent",
  LIST_BY_TEACHER: "/tutorship/listByTeacher",
  LIST_BY_TUTOR: "/tutorship/listByTutor",
  LIST_BY_ID: "/tutorship/listById",
  CREATE: "/tutorship/create",
  UPDATE: "/tutorship/update",
  REMOVE: "/tutorship/remove",
  UPLOAD_IMAGE: "/tutorship/uploadImage",
};

router.get(tutorshipRouter.LIST_ALL, listAll);
router.get(tutorshipRouter.LIST_BY_STUDENT, listByStudent);
router.get(tutorshipRouter.LIST_BY_TEACHER, listByTeacher);
router.get(tutorshipRouter.LIST_BY_TUTOR, listByTutor);
router.get(tutorshipRouter.LIST_BY_ID, listById);
router.post(tutorshipRouter.CREATE, create);
router.put(tutorshipRouter.UPDATE, update);
router.delete(tutorshipRouter.REMOVE, remove);
router.delete(tutorshipRouter.REMOVE, remove);
router.post(
  tutorshipRouter.UPLOAD_IMAGE,
  fileUpload.single("image"),
  uploadTutorshipImage
);

export default router;
