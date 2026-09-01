import {
  Request,
  Response
} from "express";

import {
  seedDatabase
} from "../services/seed.service";

export const runSeed = async (
  _req: Request,
  res: Response
): Promise<Response> => {

  try {

    await seedDatabase();

    return res.status(201).json({
      message: "Database seeded successfully"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Error seeding database"
    });
  }
};