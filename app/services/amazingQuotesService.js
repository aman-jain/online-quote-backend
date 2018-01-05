'use strict';

const axios = require('axios');

const MODULE = 'amazingQuotesService';
/* eslint-disable no-underscore-dangle */
function amazingQuotesService(config, logger) {
    function _constructReqObject(reqestObj) {
        return {
            owner_name: reqestObj.ownerName,
            model: reqestObj.model,
            seat_capacity: Number(reqestObj.seatCapacity),
            manufactured_date: reqestObj.manufacturedDate,
            purchase_price: parseInt(reqestObj.purchasePrice, 10),
            broker_email: reqestObj.brokerEmail,
        };
    }
    function getAmazingQuotes(requestObj) {
        const quotesReq = _constructReqObject(requestObj);
        logger.debug(MODULE, 'Generated API request object', quotesReq);
        return axios({
            method: 'post',
            url: config.amazingQuote.url,
            data: quotesReq,
            headers: {
                'content-type': 'application/json',
                'x-api-key': config.amazingQuote.apiKey,
            },
        }).catch((err) => {
            logger.error(MODULE, err);
            throw err;
        });
    }
    return {
        getAmazingQuotes,
    };
}
/* eslint-enable no-underscore-dangle */
module.exports = amazingQuotesService;
