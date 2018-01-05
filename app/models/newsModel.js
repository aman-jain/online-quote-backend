'use strict';

const newsServiceREQ = require('../services/newsService');

const MODULE = 'newsModel';

function newsModel(config, logger) {
    const newsService = newsServiceREQ(config, logger);
    function getNews(id) {
        logger.debug(MODULE, 'Received Request for Getting News');
        return newsService.getNews(id);
    }
    function saveNews(requestObj) {
        logger.debug(MODULE, 'Received Request for Saving News');
        return newsService.saveNews(requestObj);
    }
    function updateNews(requestObj) {
        logger.debug(MODULE, 'Received Request for Updating News');
        return newsService.updateNews(requestObj);
    }
    function deleteNews(requestObj) {
        logger.debug(MODULE, 'Received Request for Deleting News');
        return newsService.deleteNews(requestObj).then(() => newsService.getNews());
    }
    return {
        getNews,
        saveNews,
        updateNews,
        deleteNews,
    };
}

module.exports = newsModel;
