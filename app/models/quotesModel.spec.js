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
describe('Executing Test Cases For QuotesModel', () => {
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
        const initModel = rewire('./quotesModel');
        revertRewiring = initModel.__set__({
            quotesServiceREQ: () => ({
                getQuotes: () => Promise.resolve(mockQuotes.data),
                saveQuotes: () => Promise.resolve(mockQuotes.data[0]),
            }),
        });
        model = initModel(config, disableLogging);
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
    it('Expect to save quotes data from post Method', (done) => {
        model.saveQuotes(mockQuotes.data[0]).then((data) => {
            expect(data).to.be.a('Object');
            done();
        }).catch(error => done(error));
    });
});
