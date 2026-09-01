import {
  Router
} from "express";

import {
  create,
  getAllInventory,
  getInventoryRecord,
  remove,
  update
} from "../controllers/inventory.controller";

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
  getAllInventory
);

router.get(
  "/:id",
  getInventoryRecord
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