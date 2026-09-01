import {
  Router
} from "express";

import {
  create,
  getAllRequests,
  getRequest,
  remove,
  updateStatus
} from "../controllers/request.controller";

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
  getAllRequests
);

router.get(
  "/:id",
  getRequest
);

router.post(
  "/",
  authorizeRoles(["ADMIN", "GESTOR"]),
  create
);

router.patch(
  "/:id/status",
  authorizeRoles(["ADMIN", "GESTOR"]),
  updateStatus
);

router.delete(
  "/:id",
  authorizeRoles(["ADMIN"]),
  remove
);

export default router;