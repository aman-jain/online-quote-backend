'use strict';

const local = require('./env/local');
const qa = require('./env/qa');
const production = require('./env/production');

const configurations = {
    local,
    qa,
    production,
};

module.exports = runMode => configurations[runMode];

