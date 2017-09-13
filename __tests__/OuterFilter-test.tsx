jest.unmock('../src/components/paged-list/Filters/OuterFilter');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {ModelService} from '../src/utils/modelService';
import {BlogModel} from '../src/demo/models/BlogModel';
import {QueryFilter} from '../src/components/paged-list/Filters/QueryFilter';
import {DateRangeFilter} from '../src/components/paged-list/Filters/DateRangeFilter';
import {IOuterFilterProps, OuterFilterImpl} from '../src/components/paged-list/Filters/OuterFilter';

const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for OuterFilter', () => {

    const outerFilter: ShallowWrapper<IOuterFilterProps, void> = shallow<IOuterFilterProps, void> (
            <OuterFilterImpl resource="blog">
                <QueryFilter
                        label="Search"
                        paramName="query"
                        placeholder="First Name, Last Name, Email"
                />
                <DateRangeFilter
                        label="Published Between"
                        paramName="published"
                />
            </OuterFilterImpl>
    );

    unroll('should render #count #component', (done, args) => {
        expect(outerFilter.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['QueryFilter', 1],
        ['DateRangeFilter', 1],
        ['form', 1],
        ['Button', 1]
    ]);

    ModelService.register(BlogModel);

    ModelService.getModel = jest.fn<any>((resource: string) => {
        return BlogModel;
    });

    BlogModel.list = jest.fn<any>((filters: any) => {
        return [];
    });

    it('should call handleSubmit when form is submitted', () => {
        expect(BlogModel.list).not.toBeCalled();
        outerFilter.find('form').simulate('submit', {preventDefault: () => {}});
        expect(BlogModel.list).toBeCalled();
    });
});
