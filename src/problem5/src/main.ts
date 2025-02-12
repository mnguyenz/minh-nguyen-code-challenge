import express from 'express';
import { env } from './config/env.config';
import { connectDB } from './config/database.config';
import { setupSwagger } from './config/swagger.config';
import { ResourceModule } from './resources/resource.module';

const app = express();
app.use(express.json());

async function startApp() {
    try {
        await connectDB();
        await setupSwagger(app);

        const resourceModule = new ResourceModule();
        app.use('/resources', resourceModule.router);

        const PORT = env.APP_PORT;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

startApp();