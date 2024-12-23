import 'reflect-metadata';
import express from 'express';
import { sequelize } from './database/index.js';
import { serverConfig } from './config/env.js';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.js';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
    res.send('Servidor funcionando!');
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa');

        await sequelize.sync({ alter: false });
        console.log('Modelos sincronizados con la base de datos');

        app.listen(serverConfig.port, () => {
            console.log(`Servidor iniciado en http://localhost:${serverConfig.port}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();