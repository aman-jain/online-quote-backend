'use strict';

const sinon = require('sinon');
const chai = require('chai');
const rewire = require('rewire');
const configurer = require('../../config/base');
const Promise = require('bluebird');
const mockQuotes = require('../data/mockData/mockQuotes.json');


const expect = chai.expect;

/* eslint-disable no-undef */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
describe('Executing Test Cases For GET Service QuotesService', () => {
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
        const initService = rewire('./quotesService');
        revertRewiring = initService.__set__({
            mongoose: {
                Schema: () => {

                },
                model: () => {
                    const Quotes = {
                        find: () => {
                            const sort = () => Promise.resolve(mockQuotes.data);
                            return {
                                sort,
                            };
                        },
                    };
                    return (
                        Quotes
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
    it('Expect to get quotes data from get Method', (done) => {
        model.getQuotes().then((data) => {
            expect(data).to.have.lengthOf(2);
            done();
        }).catch(error => done(error));
    });
});
describe('Executing Test Cases For SAVE Service QuotesService', () => {
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
        const initService = rewire('./quotesService');
        revertRewiring = initService.__set__({
            mongoose: {
                model: () => {
                    function Quotes() {
                        this.save = () => Promise.resolve(mockQuotes.data[0]);
                    }
                    return (
                        Quotes
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
    it('Expect to save quotes data from post Method', (done) => {
        model.saveQuotes(mockQuotes.data[0]).then((data) => {
            expect(data).to.be.a('Object');
            done();
        }).catch(error => done(error));
    });
});
