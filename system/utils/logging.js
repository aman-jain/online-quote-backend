'use strict';

const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

function logging(config) {
    function configureLogger() {
        const tsFormat = () => (new Date()).toLocaleTimeString();
        const transports = [];
        transports.push(new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: `${config.logs.consoleLogLevel}`,
        }));
        // if (process.env.NODE_ENV === 'production') {
            transports.push(new (WinstonDailyRotateFile)({
                filename: `${config.logs.logDir}/-${config.logs.fileName}`,
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                level: `${config.logs.fileLogLevel}`,
            }));
        // }
        const winstonLogger = new (winston.Logger)({
            transports,
        });
        function info(moduleName, message, data) {
            let logMessage = message;
            if (data) {
                logMessage = `${message} -- ${JSON.stringify(data)}`;
            }
            winstonLogger.info(`${moduleName}: ${logMessage}`);
        }
        function debug(moduleName, message, data) {
            let logMessage = message;
            if (data) {
                logMessage = `${message} -- ${JSON.stringify(data)}`;
            }
            winstonLogger.debug(`${moduleName}: ${logMessage}`);
        }
        function warn(moduleName, message, data) {
            let logMessage = message;
            if (data) {
                logMessage = `${message} -- ${JSON.stringify(data)}`;
            }
            winstonLogger.warn(`${moduleName}: ${logMessage}`);
        }
        function error(moduleName, message, data) {
            let logMessage = message;
            if (data) {
                logMessage = `${message} -- ${JSON.stringify(data)}`;
            }
            winstonLogger.error(`${moduleName}: ${logMessage}`);
        }
        return {
            info,
            debug,
            warn,
            error,
        };
    }
    return {
        configureLogger,
    };
}
module.exports = logging;
