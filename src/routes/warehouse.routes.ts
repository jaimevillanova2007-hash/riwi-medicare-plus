import {
  Router
} from "express";

import {
  create,
  getAllWarehouses,
  getWarehouse,
  remove,
  update
} from "../controllers/warehouse.controller";

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
  getAllWarehouses
);

router.get(
  "/:id",
  getWarehouse
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