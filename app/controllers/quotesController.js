'use strict';

const MODULE = 'quotesController';
const quotesModelREQ = require('../models/quotesModel');
const constants = require('../data/constants');

function quotesController(config, logger) {
    const quotesModel = quotesModelREQ(config, logger);
    function getQuotes(req, res) {
        logger.debug(MODULE, 'Request received for getting list of quotes');
        const promise = quotesModel.getQuotes();
        return promise.then((response) => {
            logger.debug(MODULE, 'Recevied Response', response);
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
    function saveQuotes(req, res) {
        const reqObj = Object.assign({}, req.body);
        logger.debug(MODULE, 'Request received for saving quotes object', reqObj);
        const promise = quotesModel.saveQuotes(reqObj);
        return promise.then((response) => {
            logger.debug(MODULE, 'Recevied Response after saving quotes object', response);
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
        getQuotes,
        saveQuotes,
    };
}
module.exports = quotesController;
