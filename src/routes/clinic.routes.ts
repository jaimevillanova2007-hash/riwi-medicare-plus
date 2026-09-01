import {
  Router
} from "express";

import {
  create,
  getAllClinics,
  getClinic,
  remove,
  update
} from "../controllers/clinic.controller";

import {
  authenticateToken
} from "../middlewares/auth.middleware";

import {
  authorizeRoles
} from "../middlewares/role.middleware";

const router = Router();

router.use(
  authenticateToken
);

router.get(
  "/",
  getAllClinics
);

router.get(
  "/:id",
  getClinic
);

router.post(
  "/",
  authorizeRoles(["ADMIN"]),
  create
);

router.put(
  "/:id",
  authorizeRoles(["ADMIN"]),
  update
);

router.delete(
  "/:id",
  authorizeRoles(["ADMIN"]),
  remove
);

export default router;