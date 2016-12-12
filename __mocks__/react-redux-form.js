const RRF = require('react-redux-form');
const constants = require('./constants');

RRF.combineForms = jest.fn((obj) => constants.combinedForms) 

module.exports = RRF
