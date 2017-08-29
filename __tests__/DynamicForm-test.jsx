"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/Filters/DynamicForm');
var React = require("react");
var DropDownFilter_1 = require("../src/components/paged-list/Filters/DropDownFilter");
var RangeFilter_1 = require("../src/components/paged-list/Filters/RangeFilter");
var DateRangeFilter_1 = require("../src/components/paged-list/Filters/DateRangeFilter");
var QueryFilter_1 = require("../src/components/paged-list/Filters/QueryFilter");
var enzyme_1 = require("enzyme");
var DynamicForm_1 = require("../src/components/paged-list/Filters/DynamicForm");
var modelService_1 = require("../src/utils/modelService");
var BlogModel_1 = require("../src/demo/models/BlogModel");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for DynamicForm', function () {
    var children = [
        <DropDownFilter_1.DropDownFilter label="status" paramName="status" possibleValues={[
            { label: 'Enable', value: 'enable' },
            { label: 'Disable', value: 'disable' },
            { label: 'Inactive', value: 'inactive' }
        ]}/>,
        <RangeFilter_1.RangeFilter label="Bill Amount" paramName="billAmount"/>,
        <DateRangeFilter_1.DateRangeFilter label="Date Created" paramName="dateCreated"/>,
        <DropDownFilter_1.DropDownFilter label="types" paramName="types" possibleValues={[
            { label: 'Zoo', value: 'zoo' },
            { label: 'Jungle', value: 'jungle' },
            { label: 'Forest', value: 'forest' }
        ]}/>,
        <QueryFilter_1.QueryFilter label="Search" paramName="query" placeholder="First Name, Last Name, Email"/>
    ];
    var dynamicForm = enzyme_1.shallow(<DynamicForm_1.InnerFilterFormImpl resource="blog" filtersOpen={false}>
                {children}
            </DynamicForm_1.InnerFilterFormImpl>);
    unroll('should render #count #component', function (done, args) {
        expect(dynamicForm.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['DropDownFilter', 2],
        ['RangeFilter', 1],
        ['DateRangeFilter', 1],
        ['QueryFilter', 1],
        ['form', 1],
        ['Button', 1]
    ]);
    it('should hide the filters when filtersOpen is false', function () {
        expect(dynamicForm.find('form').props()["className"]).toEqual('form-inline filter-form stick-left hide');
    });
    it('should display all filters when filtersOpen is true', function () {
        dynamicForm.setProps({ filtersOpen: true });
        expect(dynamicForm.find('form').props()["className"]).toEqual('form-inline filter-form stick-left');
    });
    modelService_1.ModelService.register(BlogModel_1.BlogModel);
    modelService_1.ModelService.getModel = jest.fn(function (resource) {
        return BlogModel_1.BlogModel;
    });
    BlogModel_1.BlogModel.list = jest.fn(function (filters) {
        return [];
    });
    it('should call handleSubmit when form is submitted', function () {
        expect(BlogModel_1.BlogModel.list).not.toBeCalled();
        dynamicForm.find('form').simulate('submit', { preventDefault: function () { } });
        expect(BlogModel_1.BlogModel.list).toBeCalled();
    });
});
