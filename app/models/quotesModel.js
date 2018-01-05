'use strict';

const quotesServiceREQ = require('../services/quotesService');
const amazingQuotesServiceREQ = require('../services/amazingQuotesService');
const emailServiceREQ = require('../services/emailService');

const constants = require('../data/constants');
/* eslint-disable no-underscore-dangle */

const _ = require('lodash');

const MODULE = 'quotesModel';

function quotesModel(config, logger) {
    const quotesService = quotesServiceREQ(config, logger);
    const amazingQuotesService = amazingQuotesServiceREQ(config, logger);
    const emailService = emailServiceREQ(config, logger);

    function getQuotes() {
        logger.debug(MODULE, 'Received Request for Getting Quotes');
        return quotesService.getQuotes();
    }
    function _validateQuotesObj(quotesObj) {
        const validation = {
            status: true,
        };
        const requiredProperties = constants.REQ_QUOTES_PROPS;
        /* eslint-disable no-prototype-builtins */
        /* eslint-disable consistent-return */
        /* eslint-disable max-len */
        _.forEach(requiredProperties, (data) => {
            if ((!quotesObj.hasOwnProperty(data.property)) || (quotesObj.hasOwnProperty(data.property) && _.isEmpty(quotesObj[data.property]))) {
                validation.status = false;
                validation.error = data.message;
                return false;
            }
        });
        /* eslint-enable no-prototype-builtins */
        /* eslint-enable consistent-return */
        /* eslint-enable max-len */
        return validation;
    }
    function saveQuotes(quotesObj) {
        logger.debug(MODULE, 'Received Request for Saving Quotes');
        const validation = _validateQuotesObj(quotesObj);
        logger.debug(MODULE, 'Validity of req object', validation);
        /* eslint-disable no-param-reassign */
        if (validation.status) {
            // if the object is valid:
            // 1. Get the AMAZING Quote
            // 2. Save the data in DB
            // 3. Log the information
            // 4. Send the email
            return amazingQuotesService.getAmazingQuotes(quotesObj).then((quote) => {
                logger.debug(MODULE, 'Received quote from AMAZING API', quote.data);
                if (quote.data.ok) {
                /* quote.data = {"ok":true,
                    "data":{
                        "quote":{
                            "owner_name":"Jim",
                            "model":"Gulfstream G650",
                            "seat_capacity":19,
                            "manufactured_date":"12/23/2006",
                            "purchase_price":100000,
                            "broker_email":"jim@jim.com"
                        },
                        "annual_premium":2850006.4
                    }
                } */
                    logger.info(MODULE, `quote status = success, price = ${quote.data.data.annual_premium}`);
                    quotesObj.quotesData = quote.data.data;
                    const emailObj = Object.assign({}, quote.data.data.quote);
                    emailObj.annual_premium = quote.data.data.annual_premium;
                    emailService.sendEmail(emailObj);
                } else {
                    const reasons = _.map(quote.data.errors, (error) => {
                        let reasonMessage = '';
                        _.forEach(error.reasons, (reason) => {
                            reasonMessage += `${reason} `;
                        });
                        return reasonMessage.trim();
                    });
                    logger.info(MODULE, `quote status = failure, reason = ${reasons}`);
                    quotesObj.quotesData = { error: reasons };
                }
                return quotesService.saveQuotes(quotesObj);
            }).catch((errObj) => {
                logger.info(MODULE, errObj.response.data);
                const data = errObj.response.data;
                if (!data.ok) {
                    const reasons = _.map(data.errors, (error) => {
                        let reasonMessage = '';
                        _.forEach(error.reasons, (reasonObj) => {
                            reasonMessage += `${reasonObj.reason} `;
                        });
                        return reasonMessage.trim();
                    });
                    logger.info(MODULE, `quote status = failure, reason = ${reasons}`);
                    quotesObj.quotesData = { error: reasons };
                    return quotesService.saveQuotes(quotesObj);
                }
            });
        }
        /* eslint-enable no-param-reassign */
        const error = { message: validation.error };
        throw (error);
    }
    return {
        getQuotes,
        saveQuotes,
    };
}
/* eslint-enable no-underscore-dangle */
module.exports = quotesModel;
