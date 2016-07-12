import drop = __React.__Addons.TestUtils.Simulate.drop;
jest.unmock('../src/components/PagedList/Filters/DynamicForm');
import {FilterForm} from '../src/components/PagedList/Filters/DynamicForm';
import * as TestUtils from 'react-addons-test-utils';
import DateRangeFilter from '../src/components/PagedList/Filters/DateRangeFilter';
import DropDownFilter from '../src/components/PagedList/Filters/DropDownFilter';
import QueryFilter from '../src/components/PagedList/Filters/QueryFilter';
import RangeFilter from '../src/components/PagedList/Filters/RangeFilter';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import initializeTestCase from './initializeTestCase';
import * as React from 'react';
import {Button} from 'react-bootstrap';

describe('render a simple FilterForm', () => {
    let renderer: React.ShallowRenderer, fields: string[], resource: string,
            sendFilters: (...args: any[]) => any, children: Array<{}>, reduxFormFields: {};
    beforeEach(() => {
        let data = initializeTestCase();
        renderer = data.renderer;
        resource = 'test';
        sendFilters = jest.fn();
        fields = [];
        children = [
            <DropDownFilter
                label="status"
                paramName="status"
                possibleValues={['enable', 'disable', 'inactive']}
                key="1"
            />,
            <RangeFilter
                label="Bill Amount"
                paramName="billAmount"
                key="2"
            />,
            <DateRangeFilter
                label="Date Created"
                paramName="dateCreated"
                key="3"
            />,
            <DropDownFilter
                label="types"
                paramName="types"
                possibleValues={['Zoo', 'Jungle', 'Forest']}
                key="4"
            />,
            <QueryFilter
                label="Search"
                paramName="query"
                placeholder={['First Name', 'Last Name', 'Email']}
                key="5"
            />
        ];

        for (let child: any of children) {
            let param = child.props.paramName;
            if (['RangeFilter', 'DateRangeFilter'].indexOf(child.type.name) > -1) {
                fields.push(`${param}From`, `${param}To`);
            } else {
                fields.push(param);
            }
        }

        reduxFormFields = {};

        for (let field: string of fields) {
            reduxFormFields[field] = {name: field};
        }
    });

    it('renders a simple filterForm', () => {
        renderer.render(
            <FilterForm fields={reduxFormFields} filtersOpen={false} resource={resource} sendFilters={sendFilters}>
                {children}
            </FilterForm>
        );

        let form = renderer.getRenderOutput();

        let innerForm: Element = ShallowTestUtils.findWithClass(form, 'filter-form');
        expect(innerForm).toBeTruthy();

        let dropdown = ShallowTestUtils.findAllWithType(form, DropDownFilter);
        let range = ShallowTestUtils.findAllWithType(form, RangeFilter);
        let dateRange = ShallowTestUtils.findAllWithType(form, DateRangeFilter);
        let query = ShallowTestUtils.findAllWithType(form, QueryFilter);

        expect(ShallowTestUtils.findWithClass(form, 'hide')).toBeTruthy();
        expect(ShallowTestUtils.findWithClass(form, 'filter-button')).toBeTruthy();

        expect(dropdown.length).toEqual(2);
        expect(dropdown[0].props.fields.length).toEqual(1);
        expect(dropdown[0].props.fields[0]).toEqual(reduxFormFields[dropdown[0].props.paramName]);
        expect(dropdown[1].props.fields[0]).toEqual(reduxFormFields[dropdown[1].props.paramName]);

        expect(range.length).toEqual(1);
        expect(range[0].props.fields.length).toEqual(2);
        expect(range[0].props.fields[0]).toEqual(reduxFormFields[`${range[0].props.paramName}From`]);
        expect(range[0].props.fields[1]).toEqual(reduxFormFields[`${range[0].props.paramName}To`]);

        expect(dateRange.length).toEqual(1);
        expect(dateRange[0].props.fields.length).toEqual(2);
        expect(dateRange[0].props.fields[0]).toEqual(reduxFormFields[`${dateRange[0].props.paramName}From`]);
        expect(dateRange[0].props.fields[1]).toEqual(reduxFormFields[`${dateRange[0].props.paramName}To`]);

        expect(query.length).toEqual(1);
        expect(query[0].props.fields.length).toEqual(1);
        expect(query[0].props.fields[0]).toEqual(reduxFormFields[query[0].props.paramName]);
    });

    it('renders a FilterForm without any props', () => {
        renderer.render(
            <FilterForm />
        );
        let form = renderer.getRenderOutput();

        let innerForm = ShallowTestUtils.findWithType(form, 'form');
        expect(innerForm).toBeTruthy();
        expect(ShallowTestUtils.findWithType(innerForm, Button)).toBeTruthy();
    });

    it('renders a Filter Form with fields but no children', () => {
        renderer.render(
        <FilterForm fields={{abc: {name: 'abc'}, dev: {name: 'dev'}}}/>
        );

        let form = renderer.getRenderOutput();

        expect(form.props.children.length).toEqual(2);
        expect(form.props.children[0]).toBeFalsy();
        expect(ShallowTestUtils.findWithType(form, Button)).toBeTruthy();
    });

    it('renders a Filter Form with incorrect fields and Children', () => {
        renderer.render(
            <FilterForm fields={{abc: {name: 'abc'}, dev: {name: 'dev'}, query: {name: 'query'}}}>
                <DropDownFilter
                    label="status"
                    paramName="status"
                    possibleValues={['enable', 'disable', 'inactive']}
                />
                <RangeFilter
                    label="Bill Amount"
                    paramName="billAmount"
                />
                <QueryFilter
                    label="Search"
                    paramName="query"
                    placeholder={['First Name', 'Last Name', 'Email']}
                />
            </FilterForm>
        );

        let form = renderer.getRenderOutput();

        let dropdown = ShallowTestUtils.findWithType(form, DropDownFilter);
        expect(dropdown).toBeTruthy();
        expect(dropdown.props.fields).toBeFalsy();
        expect(dropdown.props.label).toEqual('status');
        expect(dropdown.props.paramName).toEqual('status');
        expect(dropdown.props.possibleValues).toEqual(['enable', 'disable', 'inactive']);

        let range = ShallowTestUtils.findWithType(form, RangeFilter);
        expect(range).toBeTruthy();
        expect(range.props.fields).toBeFalsy();
        expect(range.props.label).toEqual('Bill Amount');
        expect(range.props.paramName).toEqual('billAmount');

        let query = ShallowTestUtils.findWithType(form, QueryFilter);
        expect(query).toBeTruthy();
        expect(query.props.fields).toBeTruthy();
        expect(query.props.fields[0]).toEqual({name: 'query'});
        expect(query.props.label).toEqual('Search');
        expect(query.props.paramName).toEqual('query');
        expect(query.props.placeholder).toEqual(['First Name', 'Last Name', 'Email']);

    });

    it('renders a FilterForm with a div child', () => {
        renderer.render(
            <FilterForm>
                <div>test</div>
            </FilterForm>
        );

        let form = renderer.getRenderOutput();

        expect(form).toBeTruthy();
        expect(ShallowTestUtils.findWithType(form, 'div')).toBeTruthy();
    });

});
