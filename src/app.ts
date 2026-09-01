import express, {
  Application,
  Request,
  Response
} from "express";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import clinicRoutes from "./routes/clinic.routes";
import warehouseRoutes from "./routes/warehouse.routes";
import medicineRoutes from "./routes/medicine.routes";
import inventoryRoutes from "./routes/inventory.routes";
import requestRoutes from "./routes/request.routes";
import seedRoutes from "./routes/seed.routes";

import { setupSwagger } from "./config/swagger";

import "./models";

const app: Application = express();

app.use(express.json());

// ===============================
// SWAGGER
// ===============================

setupSwagger(app);

// ===============================
// RUTAS DE LA API
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/clinics", clinicRoutes);

app.use("/api/warehouses", warehouseRoutes);

app.use("/api/medicines", medicineRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/requests", requestRoutes);

app.use("/api/seed", seedRoutes);

// ===============================
// RUTA PRINCIPAL
// ===============================

app.get(
  "/",
  (_req: Request, res: Response): Response => {
    return res.status(200).json({
      message: "RiwiMediCare Plus API",
      status: "running"
    });
  }
);

export default app;