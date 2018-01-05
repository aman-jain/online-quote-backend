'use strict';

const MODULE = 'response';

function response(app, logger) {
    logger.debug(MODULE, 'Setting up response middleware');
    app.use((err, req, res, next) => {
        if (err instanceof Error) {
            logger.error(MODULE, err.message);
            logger.error(MODULE, err.stack);

            const resp = {
                status_code: 500,
                uuid: req.uuid,
                message: 'Internal Server Error',
                details: err.message,
            };
            logger.error(MODULE, 'Serving the failed response:', resp);
            res.status(resp.status_code).json(resp);
        } else {
            const resp = {
                status_code: 200,
                uuid: req.uuid,
                data: err.message,
            };
            res.status(200).json(resp);
        }
    });
} 
module.exports = response;
