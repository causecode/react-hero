"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/Filters/DropDownFilter');
var React = require("react");
var DropDownFilter_1 = require("../src/components/paged-list/Filters/DropDownFilter");
var enzyme_1 = require("enzyme");
require("../src/init");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for DropDownFilter', function () {
    var possibleValues = [
        { label: 'India', value: 'india' },
        { label: 'United Kingdom', value: 'uk' }
    ];
    var dropDownFilter = enzyme_1.shallow(<DropDownFilter_1.DropDownFilter label="Country" paramName="countryName" possibleValues={possibleValues}/>);
    unroll('should render #count #component', function (done, args) {
        expect(dropDownFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormGroup', 1],
        ['ControlLabel', 1],
        ['Field', 1]
    ]);
    it('should render label correctly', function () {
        expect(dropDownFilter.find('ControlLabel').props()["children"]).toEqual('Country');
    });
    it('should render paramName as label when label is not provided', function () {
        dropDownFilter.setProps({ label: undefined });
        expect(dropDownFilter.find('ControlLabel').props()["children"]).toEqual('CountryName');
    });
    unroll('Field should render #prop correctly', function (done, args) {
        expect(dropDownFilter.find('Field').props()[args.prop]).toEqual(args.value);
        done();
    }, [
        ['prop', 'value'],
        ['name', 'countryName'],
        ['possibleValues', possibleValues]
    ]);
});
