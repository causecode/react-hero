"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/Filters/PagedListFilter');
var React = require("react");
var PagedListFilter_1 = require("../src/components/paged-list/Filters/PagedListFilter");
var QueryFilter_1 = require("../src/components/paged-list/Filters/QueryFilter");
var enzyme_1 = require("enzyme");
var modelActions_1 = require("../src/actions/modelActions");
var constants_1 = require("../src/constants");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for PagedListFilters', function () {
    var emptyPagedListFilter = enzyme_1.shallow(<PagedListFilter_1.PagedListFilters></PagedListFilter_1.PagedListFilters>);
    var pagedListFilters = enzyme_1.shallow(<PagedListFilter_1.PagedListFilters>
                <QueryFilter_1.QueryFilter label="Search" paramName="query" placeholder="Search"/>
            </PagedListFilter_1.PagedListFilters>);
    unroll('should render #count #element', function (done, args) {
        expect(args.component.find(args.element).length).toBe(args.count);
        done();
    }, [
        ['component', 'element', 'count'],
        [emptyPagedListFilter, 'Button', 0],
        [emptyPagedListFilter, 'div', 0],
        [pagedListFilters, 'Button', 1],
        [pagedListFilters, 'div', 1]
    ]);
    modelActions_1.toggleFilters = jest.fn(function () {
        return {
            type: constants_1.TOGGLE_FILTERS
        };
    });
    it('should call toggleChange when filterButton is clicked', function () {
        expect(modelActions_1.toggleFilters).not.toBeCalled();
        pagedListFilters.find('Button').simulate('click');
        expect(modelActions_1.toggleFilters).toBeCalled();
    });
});
