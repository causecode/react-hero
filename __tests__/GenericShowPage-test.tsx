import {MissingInstanceError} from '../src/errors/MissingInstanceError';
jest.unmock('../src/components/CRUD/GenericShowPage');
import {BaseModel} from '../src/models/BaseModel';
import {GenericListPage} from '../src/components/CRUD/GenericListPage';
import {GenericShowPage} from '../src/components/CRUD/GenericShowPage';
import * as TestUtils from 'react-addons-test-utils';
import * as React from 'react';

describe('Test Generic Show Page', () => {
    let ModelInstance: IBaseModel, keys: string[];
    beforeEach(() => {
        ModelInstance = new BaseModel({id: '1' , author: 'abc'});
        keys = Object.keys(ModelInstance.instanceData);
    });

    it('renders a simple Show Page', () => {
        let page = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <GenericShowPage instance={ModelInstance}/>
        );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'data-show-table').length).toBe(1);

        let properties = TestUtils.scryRenderedDOMComponentsWithClass(page, 'base-property');
        let values = TestUtils.scryRenderedDOMComponentsWithClass(page, 'base-value');

        expect(properties.length).toBe(2);
        expect(values.length).toBe(2);

        for (let i = 0; i < properties.length; i++ ) {
            expect(properties[i].textContent).toEqual(keys[i]);
            expect(values[i].textContent).toEqual(ModelInstance.instanceData[keys[i]]);
        }
    });

    it('renders a GenericShowPage with a resource', () => {
        let page = TestUtils.renderIntoDocument<React.Component<{}, {}>> (
            <GenericShowPage instance={ModelInstance} resource="test"/>
        );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'data-show-table').length).toBe(1);

        let properties = TestUtils.scryRenderedDOMComponentsWithClass(page, 'test-property');
        let values = TestUtils.scryRenderedDOMComponentsWithClass(page, 'test-value');

        expect(properties.length).toBe(2);
        expect(values.length).toBe(2);

        for (let i = 0; i < properties.length; i++ ) {
            expect(properties[i].textContent).toEqual(keys[i]);
            expect(values[i].textContent).toEqual(ModelInstance.instanceData[keys[i]]);
        }

    });

    it('renders a GenericShowPage without any props', () => {
        let page = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <GenericShowPage />
        );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'data-show-table').length).toBe(1);

        let properties = TestUtils.scryRenderedDOMComponentsWithClass(page, 'base-property');
        let values = TestUtils.scryRenderedDOMComponentsWithClass(page, 'base-value');

        expect(properties.length).toBe(0);
        expect(values.length).toBe(0);
    });

});
