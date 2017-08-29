"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/Filters/DropDownSelect');
var React = require("react");
var DropDownSelect_1 = require("../src/components/paged-list/Filters/DropDownSelect");
var enzyme_1 = require("enzyme");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for DropDownSelect', function () {
    var possibleValues = [
        { label: 'India', value: 'india' },
        { label: 'United Kingdom', value: 'uk' }
    ];
    var handleChange = jest.fn();
    var dropDownSelect = enzyme_1.shallow(<DropDownSelect_1.DropDownSelect input={{ onChange: handleChange, value: 'india' }} possibleValues={possibleValues}/>);
    unroll('should render #count #component', function (done, args) {
        expect(dropDownSelect.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormControl', 1],
        ['option', 3]
    ]);
    unroll('should render #prop correctly', function (done, args) {
        expect(dropDownSelect.props()[args.prop]).toEqual(args.propValue);
        done();
    }, [
        ['prop', 'propValue'],
        ['value', 'india'],
        ['onChange', handleChange]
    ]);
    it('should call handleChange function when a value is selected from dropdown filter', function () {
        expect(handleChange).not.toBeCalled();
        dropDownSelect.find('FormControl').simulate('change');
        expect(handleChange).toBeCalled();
    });
});
