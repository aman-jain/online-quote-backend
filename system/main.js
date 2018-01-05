'use strict';

const runMode = (process.env.NODE_ENV || 'local').toLowerCase();

const config = require('../config/base')(runMode);

const logging = require('../system/utils/logging');
const server = require('./server');
const mongodb = require('../system/bootstrap/mongodb');

const logger = logging(config).configureLogger();
const MODULE = 'main';
logger.info(MODULE, 'Initiated Bootstrap...');
logger.info(MODULE, 'Logger Setup Complete');
logger.info(MODULE, 'Initiating Database Setup...');
mongodb(config, logger);
logger.info(MODULE, 'Database Setup Complete');
logger.info(MODULE, 'Initiating Server Setup....');
server(config, logger);

