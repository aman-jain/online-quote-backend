'use strict';

const newsControllerREQ = require('../controllers/newsController');
const quotesControllerREQ = require('../controllers/quotesController');
const userControllerREQ = require('../controllers/userController');

const newsRoute = '/news/:id?';
const quotesRoute = '/quotes';
const userRoute = '/user';
const authenticateRoute = '/authenticate';

const MODULE = 'baseRouter';
function baseRouter(app, config, logger) {
    logger.info(MODULE, 'Initiating Routes....');
    const newsController = newsControllerREQ(config, logger);
    const quotesController = quotesControllerREQ(config, logger);
    const userController = userControllerREQ(config, logger);
    // routes
    app.route(newsRoute).get(newsController.getNews);
    logger.info(MODULE, 'News Route - GET method loaded');
    app.route(newsRoute).post(newsController.saveNews);
    logger.info(MODULE, 'News Route - POST method loaded');
    app.route(newsRoute).put(newsController.updateNews);
    logger.info(MODULE, 'News Route - PUT method loaded');
    app.route(newsRoute).delete(newsController.deleteNews);
    logger.info(MODULE, 'News Route - DELETE method loaded');

    app.route(quotesRoute).get(quotesController.getQuotes);
    logger.info(MODULE, 'Quotes Route - GET method loaded');
    app.route(quotesRoute).post(quotesController.saveQuotes);
    logger.info(MODULE, 'Quotes Route - POST method loaded');

    app.route(authenticateRoute).post(userController.authenticate);
    logger.info(MODULE, 'Authenticate Route  - GET method loaded');
    app.route(userRoute).post(userController.createUser);
    logger.info(MODULE, 'User Route - POST method loaded');
}

module.exports = baseRouter;
