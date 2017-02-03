jest.unmock('../src/components/PagedList/Filters/DynamicForm');

import * as React from 'react';
import {DropDownFilter} from '../src/components/PagedList/Filters/DropDownFilter';
import {RangeFilter} from '../src/components/PagedList/Filters/RangeFilter';
import {DateRangeFilter} from '../src/components/PagedList/Filters/DateRangeFilter';
import {QueryFilter} from '../src/components/PagedList/Filters/QueryFilter';
import {shallow, ShallowWrapper} from 'enzyme';
import {IPagedListFiltersProps} from '../src/interfaces/index';
import {InnerFilterFormImpl} from '../src/components/PagedList/Filters/DynamicForm';
import {ModelService} from '../src/utils/modelService';
import {BlogModel} from '../src/demo/models/BlogModel';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for DynamicForm', () => {
    let children: JSX.Element[] = [
        <DropDownFilter
                label="status"
                paramName="status"
                possibleValues={[
                    {label: 'Enable', value: 'enable'},
                    {label: 'Disable', value: 'disable'},
                    {label: 'Inactive', value: 'inactive'}
                ]}
        />,
        <RangeFilter
                label="Bill Amount"
                paramName="billAmount"
        />,
        <DateRangeFilter
                label="Date Created"
                paramName="dateCreated"
        />,
        <DropDownFilter
                label="types"
                paramName="types"
                possibleValues={[
                    {label: 'Zoo', value: 'zoo'},
                    {label: 'Jungle', value: 'jungle'},
                    {label: 'Forest', value: 'forest'}
                ]}
        />,
        <QueryFilter
                label="Search"
                paramName="query"
                placeholder="First Name, Last Name, Email"
        />
    ];

    const dynamicForm: ShallowWrapper<IPagedListFiltersProps, void> = shallow<IPagedListFiltersProps, void> (
            <InnerFilterFormImpl resource="blog" filtersOpen={false}>
                {children}
            </InnerFilterFormImpl>
    );

    unroll('should render #count #component', (done, args) => {
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

    it('should hide the filters when filtersOpen is false', () => {
        expect(dynamicForm.find('form').props()[`className`]).toEqual('form-inline filter-form stick-left hide');
    });

    it('should display all filters when filtersOpen is true', () => {
        dynamicForm.setProps({filtersOpen: true});
        expect(dynamicForm.find('form').props()[`className`]).toEqual('form-inline filter-form stick-left');
    });

    ModelService.register(BlogModel);

    ModelService.getModel = jest.fn<any>((resource: string) => {
        return BlogModel;
    });

    BlogModel.list = jest.fn<any>((filters: any) => {
        return [];
    });

    it('should call handleSubmit when form is submitted', () => {
        expect(BlogModel.list).not.toBeCalled();
        dynamicForm.find('form').simulate('submit', {preventDefault: () => {}});
        expect(BlogModel.list).toBeCalled();
    });
});
