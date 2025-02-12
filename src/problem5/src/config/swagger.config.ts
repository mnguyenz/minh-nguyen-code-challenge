import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Q5 APIs',
            version: '1.0.0',
            description: 'Question 5 Interview API Documents',
            contact: {
                name: 'Minh Nguyen'
            },
        },
    },
    apis: ['./src/resources/controllers/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerConfig);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

export default swaggerDocs;