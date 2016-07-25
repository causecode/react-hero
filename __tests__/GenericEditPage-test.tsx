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
import {IBaseModel} from '../src/interfaces/interfaces.ts';

describe('Test Generic Edit Page', () => {
    let resource, handleSubmit, handleDelete, ModelInstance, keys, submit, del;

    beforeEach(() => {
        submit = del = false;
        let instanceData = {id: '1', author: 'abc'};
        ModelInstance = new BaseModel(instanceData);
        keys = Object.keys(ModelInstance.instanceData);
        handleSubmit = (instance: IBaseModel, e: Event) => {
            submit = true;
        };
        handleDelete = (instance: IBaseModel) => {
            del = true;
        };
        resource = 'test';

    });

    it('renders a simple GenericEditPage', () => {

        let EditPage: any = TestUtils.renderIntoDocument(
            <GenericEditPage instance={ModelInstance}
                    handleSubmit={handleSubmit} handleDelete={handleDelete} resource={resource}/>
        );

        let grid = TestUtils
                .scryRenderedComponentsWithType<React.Component<{}, {}>, React.ComponentClass<{}>>(EditPage, Grid)[0];

        expect(grid).toBeTruthy();

        let formControls: any = TestUtils.scryRenderedDOMComponentsWithTag(grid, 'input');
        let labels: any = TestUtils.scryRenderedDOMComponentsWithTag(grid, 'label');

        expect(formControls.length).toBe(2);
        for (let i = 0; i < formControls.length; i++) {
            expect(formControls[i].value).toEqual(ModelInstance.instanceData[keys[i]]);
            expect(labels[i].textContent).toEqual(keys[i]);
        }

        let newVal = 'aa';
        ModelInstance.instanceData = {id: newVal, author: newVal};
        EditPage.setState({instance: ModelInstance});

        for (let i = 0; i < formControls.length; i++) {
            expect(formControls[i].value).toEqual('aa');
        }

        let buttons = [...TestUtils.scryRenderedDOMComponentsWithTag(grid, 'button'),
                ...TestUtils.scryRenderedComponentsWithType(grid, Link)];

        expect(buttons.length).toBe(3);
        expect(buttons[0].textContent).toBe('Update');
        expect(buttons[1].textContent).toBe('Delete');
        expect(TestUtils.scryRenderedDOMComponentsWithTag(buttons[2], 'a')[0].textContent).toBe('Cancel');

        expect(buttons[2].props.to).toEqual(`${resource}/list`);

        expect(submit).toBe(false);
        expect(del).toBe(false);

        let formInstance = TestUtils.scryRenderedDOMComponentsWithTag(EditPage, 'form');

        TestUtils.Simulate.submit(formInstance[0]);
        TestUtils.Simulate.click(ReactDOM.findDOMNode(buttons[1]));

        expect(submit).toBe(true);
        expect(del).toBe(true);

    });

    it('renders an EditPage without the handleDelete function passed in the props', () => {
        let EditPage: any = TestUtils.renderIntoDocument(
             <GenericEditPage handleSubmit={handleSubmit} instance={ModelInstance}/>
        );

        let formControls: any = TestUtils.scryRenderedDOMComponentsWithTag(EditPage, 'input');
        let labels: any = TestUtils.scryRenderedDOMComponentsWithTag(EditPage, 'label');

        expect(formControls.length).toBe(2);
        for (let i = 0; i < formControls.length; i++) {
            expect(formControls[i].value).toEqual(ModelInstance.instanceData[keys[i]]);
            expect(labels[i].textContent).toEqual(keys[i]);
        }

        let newVal = 'aa';
        ModelInstance.instanceData = {id: newVal, author: newVal};
        EditPage.setState({instance: ModelInstance});

        for (let i = 0; i < formControls.length; i++) {
            expect(formControls[i].value).toEqual('aa');
        }

        let buttons = [...TestUtils.scryRenderedDOMComponentsWithTag(EditPage, 'button'),
            ...TestUtils.scryRenderedComponentsWithType(EditPage, Link)];

        expect(buttons.length).toBe(2);
        expect(buttons[0].textContent).toBe('Create');
        expect(TestUtils.scryRenderedDOMComponentsWithTag(buttons[1], 'a')[0].textContent).toBe('Cancel');

        expect(buttons[1].props.to).toEqual(`${ModelInstance.resourceName}/list`);

        expect(submit).toBe(false);

        let formInstance = TestUtils.scryRenderedDOMComponentsWithTag(EditPage, 'form');

        TestUtils.Simulate.submit(formInstance[0]);

        expect(submit).toBe(true);
    });

    it('renders an EditPage without any props', () => {
        let page = TestUtils.renderIntoDocument<React.Component<{}, {}>>(
            <GenericEditPage/>
        );

        let formControls: any = TestUtils.scryRenderedDOMComponentsWithTag(page, 'input');
        let labels: any = TestUtils.scryRenderedDOMComponentsWithTag(page, 'label');
        expect(formControls.length).toEqual(0);
        expect(labels.length).toEqual(0);

        let buttons = [...TestUtils.scryRenderedDOMComponentsWithTag(page, 'button'),
            ...TestUtils.scryRenderedDOMComponentsWithTag(page, 'a')];

        expect(buttons.length).toBe(2);
        expect(buttons[0].textContent).toBe('Create');
        expect(buttons[1].textContent).toBe('Cancel');
    });

});
