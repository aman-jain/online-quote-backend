'use strict';

const MODULE = 'userController';
const userModelREQ = require('../models/userModel');
const constants = require('../data/constants');

function userController(config, logger) {
    const userModel = userModelREQ(config, logger);
    function authenticate(req, res) {
        const promise = userModel.authenticate(req.body.userName, req.body.password);
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
    function createUser(req, res) {
        const reqObj = Object.assign({}, req.body);
        logger.debug(MODULE, 'Request received for saving user object', reqObj);
        const promise = userModel.createUser(reqObj);
        return promise.then((response) => {
            logger.debug(MODULE, 'Recevied Response after saving user object', response);
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
        authenticate,
        createUser,
    };
}
module.exports = userController;
