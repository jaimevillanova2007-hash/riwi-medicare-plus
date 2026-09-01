import {
  Router
} from "express";

import {
  create,
  getAllUsers,
  getUser,
  remove,
  update
} from "../controllers/user.controller";

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
  authorizeRoles(["ADMIN"]),
  getAllUsers
);

router.get(
  "/:id",
  authorizeRoles(["ADMIN"]),
  getUser
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