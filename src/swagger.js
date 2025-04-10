import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// This is the configuration for Swagger documentation
// It defines the OpenAPI version, API title, version, and description
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Phoenix: IMF Gadget API',
      version: '1.0.0',
      description: 'API for managing IMF gadgets securely',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Swagger will scan routes here
};

// This is the main entry point for swagger-jsdoc
// It will scan the specified files and generate the swagger documentation
const swaggerSpec = swaggerJsdoc(options);

// This function sets up the Swagger UI middleware in the Express app
// It serves the generated documentation at the specified endpoint
export const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📚 Swagger docs available at http://localhost:${process.env.PORT}/docs`);
};
