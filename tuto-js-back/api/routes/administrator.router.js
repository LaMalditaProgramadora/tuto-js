import express from "express";

import { AdministratorController } from "../controllers/_index.js";

const { create, login, resetPassword } = AdministratorController;

const router = express.Router();

const administratorRouter = {
  LOGIN: "/administrator/login",
  CREATE: "/administrator/create",
  RESET_PASSWORD: "/administrator/resetPassword"
};

router.post(administratorRouter.LOGIN, login);
router.post(administratorRouter.CREATE, create);
router.post(administratorRouter.RESET_PASSWORD, resetPassword);

export default router;
