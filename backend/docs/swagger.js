import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Encurtador de Links',
      version: '1.0.0',
      description: 'Documentação da API para o encurtador de links',
      contact: {
        name: 'Guilherme R.',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['backend/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;