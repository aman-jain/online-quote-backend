'use strict';

const sinon = require('sinon');
const chai = require('chai');
const rewire = require('rewire');
const configurer = require('../../config/base');
const Promise = require('bluebird');
const mockUser = require('../data/mockData/mockUser.json');


const expect = chai.expect;

/* eslint-disable no-undef */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
describe('Executing Test Cases For UserModel', () => {
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
        const initModel = rewire('./userModel');
        revertRewiring = initModel.__set__({
            userServiceREQ: () => ({
                getUser: () => Promise.resolve(mockUser.data),
                saveUser: () => Promise.resolve(mockUser.data[0]),
            }),
        });
        model = initModel(config, disableLogging);
    });
    after(() => {
        // runs after all tests in this block
        revertRewiring();
    });
    it('Expect to get user data from get Method', (done) => {
        model.getUser().then((data) => {
            expect(data).to.have.lengthOf(2);
            done();
        }).catch(error => done(error));
    });
    it('Expect to save user data from post Method', (done) => {
        model.createUser(mockUser.data[0]).then((data) => {
            expect(data).to.be.a('Object');
            done();
        }).catch(error => done(error));
    });
});
