'use strict';

const sinon = require('sinon');
const chai = require('chai');
const rewire = require('rewire');
const configurer = require('../../config/base');
const Promise = require('bluebird');
const mockNews = require('../data/mockData/mockNews.json');


const expect = chai.expect;

/* eslint-disable no-undef */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
describe('Executing Test Cases For NewsModel', () => {
    const config = configurer(process.env.NODE_ENV || 'local');
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
        const initModel = rewire('./newsModel');
        revertRewiring = initModel.__set__({
            newsServiceREQ: () => ({
                getNews: () => Promise.resolve(mockNews.data),
                saveNews: () => Promise.resolve(mockNews.data[0]),
                updateNews: () => Promise.resolve(mockNews.data[0]),
                deleteNews: () => Promise.resolve(mockNews.data[0]),
            }),
        });
        model = initModel(config, disableLogging);
    });
    after(() => {
        // runs after all tests in this block
        revertRewiring();
    });
    it('Expect to get news data from get Method', (done) => {
        model.getNews().then((data) => {
            expect(data).to.have.lengthOf(2);
            done();
        }).catch(error => done(error));
    });
    it('Expect to save news data from post Method', (done) => {
        model.saveNews(mockNews.data[0]).then((data) => {
            expect(data).to.be.a('Object');
            done();
        }).catch(error => done(error));
    });
    it('Expect to update news data from put Method', (done) => {
        model.updateNews(mockNews.data[0]).then((data) => {
            expect(data).to.be.a('Object');
            done();
        }).catch(error => done(error));
    });
    it('Expect to delete news data from delete Method', (done) => {
        model.deleteNews(mockNews.data[0]).then((data) => {
            expect(data).to.have.lengthOf(2);
            done();
        }).catch(error => done(error));
    });
});
