import express from 'express';
import routes from '../routes/index.js';

// Create a test server for testing the routes
const createTestServer = () => {
    const app = express();
    app.use(express.json());
    app.use('/api', routes);
    return app;
};

export default createTestServer;
