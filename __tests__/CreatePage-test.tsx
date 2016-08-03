import {IInitializerData} from './../src/utils/initializeTestCase';
jest.unmock('../src/components-stateful/CreatePage');
import {CreatePageImpl} from '../src/components-stateful/CreatePage';
import {initializeTestCase} from './../src/utils/initializeTestCase';
import * as React from 'react';
import {GenericEditPage} from '../src/components/CRUD/GenericEditPage';
import {BaseModel} from '../src/models/BaseModel';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import {ComponentService} from '../src/utils/componentService';
import {resolver} from '../src/resolver';
import * as TestUtils from 'react-addons-test-utils';
import {ModelService} from '../src/utils/modelService';
import {IShallowTestUtils} from '../src/interfaces/interfaces';
import {IInstanceContainerProps} from '../src/interfaces/interfaces';

function generalCreatePageTests(
    createPage: new() => React.Component<{}, {}>,
    page: React.ReactElement<IInstanceContainerProps>,
    instance: BaseModel,
    resource: string
): void {
    expect(page).toBeTruthy();
    let renderedPage = ShallowTestUtils.findWithType(page, createPage);
    expect(renderedPage).toBeTruthy();
    // expect(renderedPage.props.handleSubmit.toString()).toEqual(handleSubmit.toString());
    expect(renderedPage.props.handleDelete).toBeUndefined();
    expect(renderedPage.props.instance).toEqual(instance);
    expect(renderedPage.props.resource).toEqual(resource);
}

describe('test CreatePage', () => {
    let handleSubmit, handleDelete;
    let { renderer, resource, instances, fetchInstanceData } = initializeTestCase();

    beforeEach(() => {
        handleSubmit = (instance: BaseModel, e: Event) => {
            e.preventDefault();
            instance.$save();
        };
        handleDelete = (instance: BaseModel) : void => {
            instance.$delete();
        };
    });

    it('renders a simple Create Page', () => {
        renderer.render(
            <CreatePageImpl
                instances={instances}
                params={{resource: resource}}
                fetchInstanceData={fetchInstanceData}
            />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();

        generalCreatePageTests(GenericEditPage, page, instances[resource], resource);
        expect(fetchInstanceData).toBeCalled();

    });

    it('renders an CreatePage without any props', () => {
        renderer.render(
            <CreatePageImpl/>
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();

        generalCreatePageTests(GenericEditPage, page, new BaseModel({}), '');

    });

    it('renders an CreatePage with user implemented CreatePage registered', () => {
        class TestCreatePage extends React.Component<{}, {}> {}

        class TestModel extends BaseModel {}

        ModelService.register(TestModel);
        ComponentService.register(TestCreatePage);

        expect(resolver.has('testmodel')).toEqual(true);
        expect(resolver.get('testmodel')).toEqual(TestModel);
        expect(resolver.has('testcreatepage')).toEqual(true);
        expect(resolver.get('testcreatepage')).toEqual(TestCreatePage);

        renderer.render(
            <CreatePageImpl params={{resource: resource}} />
        );


        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();

        generalCreatePageTests(TestCreatePage, page, new TestModel({}), resource);

    });

});
