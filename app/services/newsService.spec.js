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
describe('Executing Test Cases For GET Service NewsService', () => {
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
        const initService = rewire('./newsService');
        revertRewiring = initService.__set__({
            mongoose: {
                Schema: () => {

                },
                model: () => {
                    const News = {
                        find: () => {
                            const sort = () => Promise.resolve(mockNews.data);
                            return {
                                sort,
                            };
                        },
                    };
                    return (
                        News
                    );
                },
            },
        });
        model = initService(config, disableLogging);
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
});
describe('Executing Test Cases For SAVE Service NewsService', () => {
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
        const initService = rewire('./newsService');
        revertRewiring = initService.__set__({
            mongoose: {
                model: () => {
                    function News() {
                        this.save = () => Promise.resolve(mockNews.data[0]);
                    }
                    return (
                        News
                    );
                },
            },
        });
        model = initService(config, disableLogging);
    });
    after(() => {
        // runs after all tests in this block
        revertRewiring();
    });
    it('Expect to save news data from post Method', (done) => {
        model.saveNews(mockNews.data[0]).then((data) => {
            expect(data).to.be.a('Object');
            done();
        }).catch(error => done(error));
    });
});
