import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "RiwiMediCare Plus API",
    version: "1.0.0",
    description:
      "API REST para la gestión de usuarios, clínicas, almacenes, medicamentos, inventario y solicitudes."
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local"
    }
  ],

  tags: [
    {
      name: "Auth",
      description: "Autenticación de usuarios"
    },
    {
      name: "Users",
      description: "Gestión de usuarios"
    },
    {
      name: "Clinics",
      description: "Gestión de clínicas"
    },
    {
      name: "Warehouses",
      description: "Gestión de almacenes"
    },
    {
      name: "Medicines",
      description: "Gestión de medicamentos"
    },
    {
      name: "Inventory",
      description: "Gestión del inventario"
    },
    {
      name: "Requests",
      description: "Gestión de solicitudes"
    },
    {
      name: "Seed",
      description: "Carga de datos iniciales"
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },

    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          name: {
            type: "string",
            example: "Administrador"
          },
          email: {
            type: "string",
            example: "admin@riwi.com"
          },
          role: {
            type: "string",
            enum: ["ADMIN", "GESTOR"],
            example: "ADMIN"
          },
          status: {
            type: "boolean",
            example: true
          }
        }
      },

      Clinic: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          name: {
            type: "string",
            example: "Clinica Riwi"
          },
          nit: {
            type: "string",
            example: "900123456-1"
          },
          responsibleName: {
            type: "string",
            example: "Carlos Perez"
          },
          responsibleEmail: {
            type: "string",
            example: "carlos@riwi.com"
          },
          status: {
            type: "boolean",
            example: true
          }
        }
      },

      Warehouse: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          name: {
            type: "string",
            example: "Almacen Principal"
          },
          location: {
            type: "string",
            example: "Barranquilla"
          },
          status: {
            type: "boolean",
            example: true
          }
        }
      },

      Medicine: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          name: {
            type: "string",
            example: "Paracetamol"
          },
          description: {
            type: "string",
            example: "Analgesico y antipiretico"
          },
          status: {
            type: "boolean",
            example: true
          }
        }
      },

      Inventory: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          warehouseId: {
            type: "integer",
            example: 1
          },
          medicineId: {
            type: "integer",
            example: 1
          },
          quantity: {
            type: "integer",
            example: 100
          },
          status: {
            type: "boolean",
            example: true
          }
        }
      },

      Request: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          clinicId: {
            type: "integer",
            example: 1
          },
          medicineId: {
            type: "integer",
            example: 1
          },
          warehouseId: {
            type: "integer",
            example: 1
          },
          quantity: {
            type: "integer",
            example: 20
          },
          status: {
            type: "string",
            enum: [
              "PENDING",
              "APPROVED",
              "REJECTED",
              "DELIVERED",
              "CANCELLED"
            ],
            example: "PENDING"
          },
          createdBy: {
            type: "integer",
            example: 1
          },
          active: {
            type: "boolean",
            example: true
          }
        }
      }
    }
  },

  security: [
    {
      bearerAuth: []
    }
  ],

  paths: {}
};

export const setupSwagger = (
  app: Application
): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
};