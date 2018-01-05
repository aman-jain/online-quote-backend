'use strict';

const userServiceREQ = require('../services/userService');

const MODULE = 'userModel';

function userModel(config, logger) {
    const userService = userServiceREQ(config, logger);
    function authenticate(userName, password) {
        logger.debug(MODULE, 'Received Request for Getting User');
        return userService.getUser(userName)
            .then((user) => {
                if (user && user.password === password) {
                    return {
                        message: 'Login Successful',
                        status: 'ok',
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                    };
                }
                return {
                    message: 'Login Failed',
                    status: 'fail',
                };
            });
    }
    function getUser(userName) {
        logger.debug(MODULE, 'Received Request for Getting User');
        return userService.getUser(userName);
    }
    function createUser(requestObj) {
        logger.debug(MODULE, 'Received Request for Saving User');
        return userService.saveUser(requestObj);
    }
    return {
        authenticate,
        createUser,
        getUser,
    };
}

module.exports = userModel;
