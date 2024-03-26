'use strict';
require('dotenv').config();
const app = require('../app');
const logger = require('../lib/logger');

return app.connectMongoose()
    .then(() => {
        const application = app.initialize();
        application.listen(8080);
        logger.info(`Your server is listening on port ${process.env.SERVER_PORT}`);
    })
    .catch((error) => {
        logger.error('APP STOPPED');
        logger.error(error.stack);
        return process.exit(1);
    });
