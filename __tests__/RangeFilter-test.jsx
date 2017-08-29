"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/Filters/RangeFilter');
var React = require("react");
var RangeFilter_1 = require("../src/components/paged-list/Filters/RangeFilter");
var enzyme_1 = require("enzyme");
require("../src/init");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for RangeFilter', function () {
    var rangeFilter = enzyme_1.shallow(<RangeFilter_1.RangeFilter label="Price Range" paramName="priceBetween"/>);
    unroll('should render #count #component', function (done, args) {
        expect(rangeFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormGroup', 1],
        ['ControlLabel', 1],
        ['strong', 2],
        ['Field', 2]
    ]);
    it('should render label correctly', function () {
        expect(rangeFilter.find('ControlLabel').props()["children"]).toEqual('Price Range');
    });
    it('should render paramName as label when label is not provided', function () {
        rangeFilter.setProps({ label: undefined });
        expect(rangeFilter.find('ControlLabel').props()["children"]).toEqual('PriceBetween');
    });
    it('should render default input type as text', function () {
        rangeFilter.find('Field').forEach(function (field) {
            expect(field.props()["type"]).toEqual('text');
        });
    });
    it('should render custom input type when type prop is provided', function () {
        rangeFilter.setProps({ type: 'number' });
        rangeFilter.find('Field').forEach(function (field) {
            expect(field.props()["type"]).toEqual('number');
        });
    });
});
