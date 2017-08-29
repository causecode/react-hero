"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/Filters/DateRangeFilter');
var React = require("react");
var DateRangeFilter_1 = require("../src/components/paged-list/Filters/DateRangeFilter");
var enzyme_1 = require("enzyme");
require("../src/init");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for DateRangeFilter', function () {
    var dateRangeFilter = enzyme_1.shallow(<DateRangeFilter_1.DateRangeFilter label="Date Range" paramName="dateBetween"/>);
    unroll('should render #count #component', function (done, args) {
        expect(dateRangeFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormGroup', 1],
        ['ControlLabel', 1],
        ['strong', 2],
        ['Field', 2]
    ]);
    it('should render label correctly', function () {
        expect(dateRangeFilter.find('ControlLabel').props()["children"]).toEqual('Date Range');
    });
    it('should render paramName as label when label is not provided', function () {
        dateRangeFilter.setProps({ label: undefined });
        expect(dateRangeFilter.find('ControlLabel').props()["children"]).toEqual('DateBetween');
    });
});
