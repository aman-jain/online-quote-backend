'use strict';

const express = require('express');
const https = require('https');
const http = require('http');

const baseRoutes = require('../app/routes/baseRoutes');
const bodyParser = require('body-parser');
const response = require('../system/bootstrap/reponse');

const MODULE = 'server';
function server(config, logger) {
    const app = express();
    // Add headers
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', config.cors.allowed);
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    logger.info(MODULE, 'Setting up Routes');
    baseRoutes(app, config, logger);
    logger.info(MODULE, 'Setting up Response Middleware');
    response(app, logger);
    const enableSSL = config.server.enableSSL;
    logger.info(MODULE, `SSL MODE: ${enableSSL}`);
    if (enableSSL) {
        const port = process.env.PORT || config.server.httpsPort;
        const httpsServer = https.createServer(app);
        httpsServer.listen(port, () => {
            const host = httpsServer.address().address;
            const portAddr = httpsServer.address().port;
            logger.info(MODULE, `Started Server on: ${host}:${portAddr}`);
        });
    } else {
        const port = process.env.PORT || config.server.httpPort;
        const httpServer = http.createServer(app);
        httpServer.listen(port, () => {
            const host = httpServer.address().address;
            const portAddr = httpServer.address().port;
            logger.info(MODULE, `Started Server on: ${host}:${portAddr}`);
        });
    }
}

module.exports = server;
