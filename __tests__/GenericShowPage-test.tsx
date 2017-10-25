jest.unmock('../src/components/CRUD/GenericShowPage');

import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import {MissingInstanceError} from '../src/errors/MissingInstanceError';
import {IInstancePageProps} from '../src/interfaces';
import {GenericListPage} from '../src/components/CRUD/GenericListPage';
import {GenericShowPage} from '../src/components/CRUD/GenericShowPage';
import {BaseModel} from '../src/models/BaseModel';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test Generic Show Page', () => {
    let ModelInstance: BaseModel = new BaseModel({id: '1' , author: 'abc'});
    let keys: string[] = Object.keys(ModelInstance.properties);

    unroll('renders a GenericShowPage #title', (done, testArgs: {page: React.DOMElement<{}, {}>}) => {
        const {resource} = testArgs;
        let showPage: React.Component<IInstancePageProps, void> =
            TestUtils.renderIntoDocument<React.Component<IInstancePageProps, void>>(
                testArgs.page
            );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(showPage, 'data-show-table').length).toBe(1);

        let properties: Element[] = TestUtils.scryRenderedDOMComponentsWithClass(showPage, `${resource}-property`);
        let values: Element[] = TestUtils.scryRenderedDOMComponentsWithClass(showPage, `${resource}-value`);

        expect(properties.length).toBe(2);
        expect(values.length).toBe(2);

        for (let i = 0; i < properties.length; i++ ) {
            expect(properties[i].textContent).toEqual(keys[i]);
            expect(values[i].textContent).toEqual(ModelInstance.properties[keys[i]]);
        }
        done();
    }, [
        ['title', 'page', 'resource'],
        ['without a resource', <GenericShowPage instance={ModelInstance} />, 'base'],
        ['with a resource', <GenericShowPage instance={ModelInstance} resource="test"/>, 'test']
    ]);

    it('renders a GenericShowPage without any props', () => {
        let page = TestUtils.renderIntoDocument<React.Component<void, void>>(
            <GenericShowPage />
        );

        expect(TestUtils.scryRenderedDOMComponentsWithClass(page, 'data-show-table').length).toBe(1);

        let properties = TestUtils.scryRenderedDOMComponentsWithClass(page, 'base-property');
        let values = TestUtils.scryRenderedDOMComponentsWithClass(page, 'base-value');

        expect(properties.length).toBe(0);
        expect(values.length).toBe(0);
    });

});
