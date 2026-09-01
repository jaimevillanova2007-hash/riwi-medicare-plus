import { Router } from "express";

import {
  runSeed
} from "../controllers/seed.controller";

const router: Router = Router();

router.post(
  "/",
  runSeed
);

export default router;