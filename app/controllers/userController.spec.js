'use strict';

const sinon = require('sinon');
const chai = require('chai');
const rewire = require('rewire');
const configurer = require('../../config/base');
const Promise = require('bluebird');
const request = require('supertest');
const express = require('express');
const mockUser = require('../data/mockData/mockUser.json');
const bodyParser = require('body-parser');

const expect = chai.expect;

/* eslint-disable no-undef */
/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
describe('Executing Test Cases For UserController', () => {
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
        const initModel = rewire('./userController');
        revertRewiring = initModel.__set__({
            userModelREQ: () => ({
                authenticate: () => Promise.resolve(mockUser.data),
                createUser: () => Promise.resolve(mockUser.data),
            }),
        });
        model = initModel(config, disableLogging);
        router.post('/authenticate', model.authenticate);
        router.post('/user', model.createUser);
        app.use(router);
    });
    after(() => {
        // runs after all tests in this block
        revertRewiring();
    });
    it('Expect to autneticate user data from get Method', () => {
        const route = '/authenticate';
        request(app)
            .post(route)
            .set('Content-type', 'application/json')
            .send(mockUser.data)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.responseCode).to.be.equal(1);
                return done();
            });
    });
    it('Expect to save user data from post Method', () => {
        const route = '/user';
        request(app)
            .post(route)
            .set('Content-type', 'application/json')
            .send(mockUser.data)
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
