'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MODULE = 'userService';

function userService(config, logger) {
    const userSchema = new Schema({
        id: Schema.Types.ObjectId,
        userName: String,
        password: String,
        firstName: String,
        lastName: String,
        createdAt: Date,
        updatedAt: Date,
        createdBy: String,
        updatedBy: String,
    });
    const User = mongoose.model('User', userSchema);
    function getUser(userName) {
        logger.debug(MODULE, 'Request received for getting user');
        return User.findOne({ userName });
    }
    function saveUser(userObj) {
        logger.debug(MODULE, 'Request received for saving user');
        const user = new User({
            userName: userObj.userName,
            password: userObj.password,
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        return user.save();
    }

    return {
        getUser,
        saveUser,
    };
}

module.exports = userService;
