'use strict';

const MODULE = 'newsController';
const newsModelREQ = require('../models/newsModel');
const constants = require('../data/constants');

function newsController(config, logger) {
    const newsModel = newsModelREQ(config, logger);
    function getNews(req, res) {
        logger.debug(MODULE, `Request received for getting list of news:${req.params.id}`);
        const promise = newsModel.getNews(req.params.id);
        return promise.then((response) => {
            logger.debug(MODULE, 'Recevied Response', response);
            res.json(response);
        }).catch((err) => {
            logger.error(MODULE, err);
            const error = {
                errorCode: constants.F_500,
                errorMessage: err,
            };
            res.status(constants.F_500).json(error);
        });
    }
    function saveNews(req, res) {
        const reqObj = Object.assign({}, req.body);
        logger.debug(MODULE, 'Request received for saving news object', reqObj);
        const promise = newsModel.saveNews(reqObj);
        return promise.then((response) => {
            logger.debug(MODULE, 'Recevied Response after saving news object', response);
            res.status(constants.S_201).json(response);
        }).catch((err) => {
            logger.error(MODULE, err);
            const error = {
                errorCode: constants.F_500,
                errorMessage: err,
            };
            res.status(constants.F_500).json(error);
        });
    }
    function updateNews(req, res) {
        const reqObj = Object.assign({}, req.body);
        logger.debug(MODULE, 'Request received for updating news object', reqObj);
        const promise = newsModel.updateNews(reqObj);
        return promise.then((response) => {
            logger.debug(MODULE, 'Recevied Response after updating news object', response);
            res.status(constants.S_200).json(response);
        }).catch((err) => {
            logger.error(MODULE, err);
            const error = {
                errorCode: constants.F_500,
                errorMessage: err,
            };
            res.status(constants.F_500).json(error);
        });
    }
    function deleteNews(req, res) {
        const reqObj = Object.assign({}, req.body);
        logger.debug(MODULE, 'Request received for deleting news object', reqObj);
        const promise = newsModel.deleteNews(reqObj);
        return promise.then((response) => {
            logger.debug(MODULE, 'Recevied Response after deleting news object', response);
            res.status(constants.S_201).json(response);
        }).catch((err) => {
            logger.error(MODULE, err);
            const error = {
                errorCode: constants.F_500,
                errorMessage: err,
            };
            res.status(constants.F_500).json(error);
        });
    }
    return {
        getNews,
        saveNews,
        updateNews,
        deleteNews,
    };
}
module.exports = newsController;
