'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MODULE = 'newsService';

function newsService(config, logger) {
    const newsSchema = new Schema({
        id: Schema.Types.ObjectId,
        title: String,
        description: String,
        deleted: Boolean,
        createdAt: Date,
        updatedAt: Date,
        createdBy: String,
        updatedBy: String,
    });
    const News = mongoose.model('News', newsSchema);
    function getNews(id) {
        logger.debug(MODULE, 'Request received for getting news');
        if (id) {
            return News.find({ _id: id, deleted: false });
        }
        return News.find({ deleted: false }).sort('-updatedAt');
    }
    function saveNews(newsObj) {
        logger.debug(MODULE, 'Request received for saving news');
        const news = new News({
            title: newsObj.title,
            description: newsObj.description,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            deleted: false,
            createdBy: newsObj.user,
            updatedBy: newsObj.user,
        });
        return news.save();
    }
    function updateNews(newsObj) {
        logger.debug(MODULE, 'Request received for updating news');
        /* eslint-disable no-underscore-dangle */
        const query = { _id: newsObj.id };
        /* eslint-enable no-underscore-dangle */
        const news = {
            title: newsObj.title,
            description: newsObj.description,
            updatedAt: Date.now(),
            deleted: false,
            updatedBy: newsObj.user,
        };
        return News.findOneAndUpdate(query, news, { new: true, upsert: false });
    }
    function deleteNews(newsObj) {
        logger.debug(MODULE, 'Request received for deleting news');
        /* eslint-disable no-underscore-dangle */
        const query = { _id: newsObj._id };
        /* eslint-enable no-underscore-dangle */
        const news = {
            updatedAt: Date.now(),
            deleted: true,
            updatedBy: newsObj.user,
        };
        return News.findOneAndUpdate(query, news, { new: true, upsert: false });
    }

    return {
        getNews,
        saveNews,
        updateNews,
        deleteNews,
    };
}

module.exports = newsService;
