import {
  Router
} from "express";

import {
  create,
  getAllMedicines,
  getMedicine,
  remove,
  update
} from "../controllers/medicine.controller";

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
  getAllMedicines
);

router.get(
  "/:id",
  getMedicine
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