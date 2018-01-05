'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const MODULE = 'quotesService';

function quotesService(config, logger) {
    const quotesSchema = new Schema({
        id: Schema.Types.ObjectId,
        ownerName: String,
        model: String,
        seatCapacity: Number,
        manufacturedDate: Date,
        purchasePrice: Number,
        borkerEmail: String,
        quotesData: Schema.Types.Mixed,
        createdAt: Date,
    });
    const Quotes = mongoose.model('Quotes', quotesSchema);
    function getQuotes() {
        logger.debug(MODULE, 'Request received for getting quotes');
        return Quotes.find({ }).sort('-updatedAt');
    }
    function saveQuotes(quotesObj) {
        logger.debug(MODULE, 'Request received for saving quotes', quotesObj);
        const quotes = new Quotes({
            ownerName: quotesObj.ownerName,
            model: quotesObj.model,
            jetCapacity: quotesObj.jetCapacity,
            manufacturedDate: quotesObj.manufacturedDate,
            purchasePrice: quotesObj.purchasePrice,
            borkerEmail: quotesObj.brokerEmail,
            quotesData: quotesObj.quotesData,
            createdAt: Date.now(),
        });
        return quotes.save();
    }
    return {
        getQuotes,
        saveQuotes,
    };
}

module.exports = quotesService;
