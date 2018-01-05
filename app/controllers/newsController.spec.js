'use strict';

const sinon = require('sinon');
const chai = require('chai');
const rewire = require('rewire');
const configurer = require('../../config/base');
const Promise = require('bluebird');
const request = require('supertest');
const express = require('express');
const mockNews = require('../data/mockData/mockNews.json');
const bodyParser = require('body-parser');

const expect = chai.expect;

/* eslint-disable no-undef */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
describe('Executing Test Cases For NewsController', () => {
    const config = configurer(process.env.NODE_ENV || 'local');
    const app = express();
    const router = express.Router();
    const disableLogging = {
        info: sinon.spy(),
        debug: sinon.spy(),
        warn: sinon.spy(),
        error: sinon.spy(),
    };
    let revertRewiring;
    let model;
    before(() => {
        // runs before all tests in this block
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        const initModel = rewire('./newsController');
        revertRewiring = initModel.__set__({
            newsModelREQ: () => ({
                getNews: () => Promise.resolve(mockNews.data),
                saveNews: () => Promise.resolve(mockNews.data[0]),
                updateNews: () => Promise.resolve(mockNews.data[0]),
                deleteNews: () => Promise.resolve(mockNews.data[0]),
            }),
        });
        model = initModel(config, disableLogging);
        router.get('/news:id?', model.getNews);
        router.post('/news:id?', model.saveNews);
        router.put('/news:id?', model.updateNews);
        router.delete('/news:id?', model.deleteNews);
        app.use(router);
    });
    after(() => {
        // runs after all tests in this block
        revertRewiring();
    });
    it('Expect to get news data from get Method', () => {
        const route = '/news';
        request(app)
            .get(route)
            .set('Content-type', 'application/json')
            .send()
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.responseCode).to.be.equal(1);
                return done();
            });
    });
    it('Expect to save news data from post Method', () => {
        const route = '/news';
        request(app)
            .post(route)
            .set('Content-type', 'application/json')
            .send(mockNews.data[0])
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('Object');
                return done();
            });
    });
    it('Expect to update news data from put Method', () => {
        const route = '/news';
        request(app)
            .put(route)
            .set('Content-type', 'application/json')
            .send(mockNews.data[0])
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('Object');
                return done();
            });
    });
    it('Expect to delete news data from delete Method', () => {
        const route = '/news';
        request(app)
            .delete(route)
            .set('Content-type', 'application/json')
            .send(mockNews.data[0])
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).to.be.an('Object');
                return done();
            });
    });
});
