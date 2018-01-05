'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');

const MODULE = 'mongodb';

function mongodb(config, logger) {
    const dbURL = `mongodb://${config.database.host}:${config.database.port}/${config.database.db}`;

    mongoose.connect(dbURL, {
        useMongoClient: true,
    });
    mongoose.Promise = Promise;
    const db = mongoose.connection;
    db.on('connected', () => {
        logger.info(MODULE, 'Mongoose default connection establised on ', dbURL);
    });
    db.on('error', (err) => {
        logger.error(MODULE, 'Mongoose default connection error has occured', err);
    });
    db.on('disconnected', () => {
        logger.warn(MODULE, 'Mongoose default connection is disconnected');
    });
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            logger.info(MODULE, 'Mongoose default connection is disconnected due to application termination');
            process.exit(0);
        });
    });
}

module.exports = mongodb;

