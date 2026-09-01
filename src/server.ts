import dotenv from "dotenv";

dotenv.config();

console.log("🚨 SERVER.TS SE ESTÁ EJECUTANDO");

import app from "./app";
import database from "./config/database";

const PORT: number =
  Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  try {
    await database.authenticate();

    console.log(
      "✅ PostgreSQL conectado correctamente"
    );

    await database.sync();

    console.log(
      "✅ Modelos sincronizados correctamente"
    );

    app.listen(
      PORT,
      (): void => {
        console.log(
          `🚀 API ejecutándose en http://localhost:${PORT}`
        );
      }
    );

  } catch (error) {
    console.error(
      "❌ Error al iniciar:",
      error
    );
  }
};

startServer();