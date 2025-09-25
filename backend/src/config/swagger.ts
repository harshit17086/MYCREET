import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.API_TITLE || 'Your API Name',
      version: process.env.API_VERSION || '1.0.0',
      description: process.env.API_DESCRIPTION || 'API Documentation',
      contact: {
        name: process.env.API_CONTACT_NAME || 'API Support',
        email: process.env.API_CONTACT_EMAIL || 'support@example.com'
      }
    },
    servers: [
      {
        url: process.env.SERVER_URL || process.env.LOCAL_BACKEND_URI || 'http://localhost:3000',
        description: process.env.SERVER_DESCRIPTION || 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        // Add your custom schemas here
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/index.ts', './src/routes/*.ts'] // Update paths as needed
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;