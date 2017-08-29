"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/Filters/OuterFilter');
var React = require("react");
var enzyme_1 = require("enzyme");
var modelService_1 = require("../src/utils/modelService");
var BlogModel_1 = require("../src/demo/models/BlogModel");
var QueryFilter_1 = require("../src/components/paged-list/Filters/QueryFilter");
var DateRangeFilter_1 = require("../src/components/paged-list/Filters/DateRangeFilter");
var OuterFilter_1 = require("../src/components/paged-list/Filters/OuterFilter");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for OuterFilter', function () {
    var outerFilter = enzyme_1.shallow(<OuterFilter_1.OuterFilterImpl resource="blog">
                <QueryFilter_1.QueryFilter label="Search" paramName="query" placeholder="First Name, Last Name, Email"/>
                <DateRangeFilter_1.DateRangeFilter label="Published Between" paramName="published"/>
            </OuterFilter_1.OuterFilterImpl>);
    unroll('should render #count #component', function (done, args) {
        expect(outerFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['QueryFilter', 1],
        ['DateRangeFilter', 1],
        ['form', 1],
        ['Button', 1]
    ]);
    modelService_1.ModelService.register(BlogModel_1.BlogModel);
    modelService_1.ModelService.getModel = jest.fn(function (resource) {
        return BlogModel_1.BlogModel;
    });
    BlogModel_1.BlogModel.list = jest.fn(function (filters) {
        return [];
    });
    it('should call handleSubmit when form is submitted', function () {
        expect(BlogModel_1.BlogModel.list).not.toBeCalled();
        outerFilter.find('form').simulate('submit', { preventDefault: function () { } });
        expect(BlogModel_1.BlogModel.list).toBeCalled();
    });
});
