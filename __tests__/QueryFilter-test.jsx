"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/Filters/QueryFilter');
var React = require("react");
var QueryFilter_1 = require("../src/components/paged-list/Filters/QueryFilter");
var enzyme_1 = require("enzyme");
require("../src/init");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for QueryFilter', function () {
    var queryFilter = enzyme_1.shallow(<QueryFilter_1.QueryFilter label="Search" paramName="query" placeholder="Start typing to search..."/>);
    unroll('should render #count #component', function (done, args) {
        expect(queryFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['FormGroup', 1],
        ['ControlLabel', 1],
        ['Field', 1]
    ]);
    it('should render label correctly', function () {
        expect(queryFilter.find('ControlLabel').props()["children"]).toEqual('Search');
    });
    it('should render paramName as label when label is not provided', function () {
        queryFilter.setProps({ label: undefined });
        expect(queryFilter.find('ControlLabel').props()["children"]).toEqual('Query');
    });
    unroll('Field should render #prop correctly', function (done, args) {
        expect(queryFilter.find('Field').props()[args.prop]).toEqual(args.value);
        done();
    }, [
        ['prop', 'value'],
        ['type', 'text'],
        ['name', 'query'],
        ['placeholder', 'Start typing to search...']
    ]);
});
