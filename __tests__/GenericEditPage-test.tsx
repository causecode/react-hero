import {BaseModel} from '../src/models/BaseModel';
jest.unmock('../src/components/CRUD/GenericEditPage');
jest.unmock('react-bootstrap');
import {GenericEditPage} from '../src/components/CRUD/GenericEditPage';
import * as TestUtils from 'react-addons-test-utils';
import {Grid} from 'react-bootstrap';
import * as React from 'react';
import {FormControl} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import * as ReactDOM from 'react-dom';
import {Row, Button} from 'react-bootstrap';
import {MissingInstanceError} from '../src/errors/MissingInstanceError';
import {Link} from 'react-router';
import {initializeTestCase} from './../src/utils/initializeTestCase';

describe('Test Generic Edit Page', () => {
    let handleSubmit: jest.Mock<Function>, handleDelete: jest.Mock<Function>;
    let params: {resource: string} = {resource: 'test'};
    let instanceData: {id: string, author: string} = {id: '1', author: 'abc'};
    let ModelInstance: BaseModel = new BaseModel(instanceData);
    let keys: string[] = Object.keys(ModelInstance.properties);

    beforeEach(() => {
        handleSubmit = jest.fn<Function>();
        handleDelete = jest.fn<Function>();
    });

    function genericEditPageTests(editPage) {

        let formControls: HTMLInputElement[] =
            TestUtils.scryRenderedDOMComponentsWithTag(editPage, 'input') as HTMLInputElement[];
        let labels: HTMLInputElement[] =
            TestUtils.scryRenderedDOMComponentsWithTag(editPage, 'label') as HTMLInputElement[];

        expect(formControls.length).toBe(2);
        for (let i: number = 0; i < formControls.length; i++) {
            expect(formControls[i].value).toEqual(ModelInstance.properties[keys[i]]);
            expect(labels[i].textContent).toEqual(keys[i]);
        }

        let randomString: string = 'aa';
        ModelInstance.properties = {id: randomString, author: randomString};
        editPage.setState({instance: ModelInstance});

        for (let i: number = 0; i < formControls.length; i++) {
            expect(formControls[i].value).toEqual('aa');
        }

        expect(handleSubmit).not.toBeCalled();

        let formInstance = TestUtils.scryRenderedDOMComponentsWithTag(editPage, 'form');
        TestUtils.Simulate.submit(formInstance[0]);
        expect(handleSubmit).toBeCalled();
    }

    it('renders a simple GenericEditPage', () => {

        let editPage: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
            <GenericEditPage instance={ModelInstance}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                    params={params}
                    instance={ModelInstance}/>
        );

        genericEditPageTests(editPage);

        let buttons = [...TestUtils.scryRenderedDOMComponentsWithTag(editPage, 'button'),
        ...TestUtils.scryRenderedComponentsWithType(editPage, Link)];

        expect(buttons.length).toBe(3);
        expect(buttons[0].textContent).toBe('Update');
        expect(buttons[1].textContent).toBe('Delete');
        expect(TestUtils.scryRenderedDOMComponentsWithTag(buttons[2], 'a')[0].textContent).toBe('Cancel');

        expect(buttons[2].props.to).toEqual(`${params.resource}/list`);
        expect(handleDelete).not.toBeCalled();
        TestUtils.Simulate.click(ReactDOM.findDOMNode(buttons[1]));
        expect(handleDelete).toBeCalled();
    });

    it('renders an EditPage without the handleDelete function passed in the props', () => {
        let editPage: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
             <GenericEditPage handleSubmit={handleSubmit} instance={ModelInstance}/>
        );

        genericEditPageTests(editPage);
        let buttons = [...TestUtils.scryRenderedDOMComponentsWithTag(editPage, 'button'),
            ...TestUtils.scryRenderedComponentsWithType(editPage, Link)];

        expect(buttons.length).toBe(2);
        expect(buttons[0].textContent).toBe('Create');

        expect(TestUtils.scryRenderedDOMComponentsWithTag(buttons[1], 'a')[0].textContent).toBe('Cancel');
        expect(buttons[1].props.to).toEqual(`${ModelInstance.resourceName}/list`);
    });

    it('renders an EditPage without any props', () => {
        let page: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
            <GenericEditPage/>
        );
        expect(page.props.isCreatePage).toBeFalsy();
        expect(page.props.params.resource).toBe('');
        expect(page.props.instance).toEqual(new BaseModel({}));
        expect(TestUtils.scryRenderedDOMComponentsWithTag(page, 'input').length).toEqual(0);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(page, 'label').length).toEqual(0);

        let buttons = [...TestUtils.scryRenderedDOMComponentsWithTag(page, 'button'),
            ...TestUtils.scryRenderedComponentsWithType(page, Link)];

        expect(buttons.length).toBe(2);
        expect(buttons[0].textContent).toBe('Create');
        expect(TestUtils.scryRenderedDOMComponentsWithTag(buttons[1], 'a')[0].textContent).toBe('Cancel');
    });

});
