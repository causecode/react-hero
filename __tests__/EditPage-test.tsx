import {GenericEditPage} from '../src/components/CRUD/GenericEditPage';
jest.unmock('../src/components-stateful/EditPage');
import {modelReducer} from '../src/reducers/modelReducer';
import {EditPageImpl, EditPageProps} from '../src/components-stateful/EditPage';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {BaseModel} from '../src/models/BaseModel';
import {ComponentService} from '../src/utils/componentService';
import {ModelService} from '../src/utils/modelService';
import {resolver} from '../src/resolver';
import {IInitializerData} from './../src/utils/initializeTestCase';
import {IShallowTestUtils} from '../src/interfaces/interfaces';
import {IInstanceContainerProps} from '../src/interfaces/interfaces';
import {createStore} from 'redux';
import {createInstance} from '../src/actions/modelActions';
import {PAGE_NOT_FOUND} from '../src/constants';
import {ErrorPage} from '../src/components/ErrorPage';

function generalEditPageTests(renderedPage, instance: BaseModel, resource: string ): void {
    expect(renderedPage).toBeTruthy();
    expect(renderedPage.props.instance).toEqual(instance);
    expect(renderedPage.props.params.resource).toEqual(resource);
    /*
     * Commenting these out so that later when a work around for checking function equality is found
     * these test cases can also be executed.
     */
    // expect(renderedPage.props.handleSubmit.toString()).toEqual(handleSubmit.toString());
    // expect(renderedPage.props.handleDelete.toString()).toEqual(handleDelete.toString());
}

describe('Test EditPage', () => {
    let fetchInstanceData: jest.Mock<Function>;
    let path: string = 'edit';
    let id: number = 1;
    let { resource, instances }: IInitializerData = initializeTestCase();
    let renderer: React.ShallowRenderer;
    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        BaseModel.get = jest.fn<Function>();
    });

    it('renders a simple Edit Page', () => {
        renderer.render(
        <EditPageImpl
                params={{resource: resource, resourceID: id}}
                instance={instances[resource]}
                location={{pathname: path}}
                createInstance={() => {}}
            />
        );
        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        expect(page.props.location.pathname).toBe(path);
        expect(page.props.instance).toBe(instances[resource]);
        expect(page.props.params.resource).toBe(resource);
        expect(page.props.params.resourceID).toBe(id);
        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);

        generalEditPageTests(renderedPage, instances[resource], resource);
        expect(BaseModel.get).toBeCalledWith(1);

    });

    it('renders a simple EditPage without a resourceID', () => {
        renderer.render(
            <EditPageImpl
                params={{resource: resource}}
                instance={instances[resource]}
                location={{pathname: ''}}
                createInstance={() => {}}
            />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();

        expect(page).toBeTruthy();
        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
        generalEditPageTests(renderedPage, instances[resource], resource);
        expect(BaseModel.get).not.toBeCalled();
    });

    it('renders an EditPage without any props', () => {
        renderer.render(
            <EditPageImpl />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        expect(page.props.location.pathname).toBe('');
        expect(page.props.params.resource).toBe('');
        expect(page.props.params.resourceID).toBe('');
        expect(page.props.instance).toEqual(new BaseModel({}));
        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
        generalEditPageTests(renderedPage, new BaseModel({}), '');
        expect(BaseModel.get).not.toBeCalled();
    });

    it('renders an EditPage with user implemented EditPage and Model registered', () => {
        class TestEditPage extends React.Component<void, void> {
            render() {
                return(
                    <div></div>
                );
            }
        }
        class TestModel extends BaseModel {
            constructor(data) {
                super(data);
            }
        }

        ModelService.register(TestModel);
        ComponentService.register(TestEditPage);

        expect(resolver.has('testmodel')).toEqual(true);
        expect(resolver.get('testmodel')).toEqual(TestModel);
        expect(resolver.has('testeditpage')).toEqual(true);
        expect(resolver.get('testeditpage')).toEqual(TestEditPage);

        renderer.render(
            <EditPageImpl params={{resource: resource, resourceID: 1}}  instance={new TestModel({})}/>
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage = ShallowTestUtils.findWithType(page, TestEditPage);
        generalEditPageTests(renderedPage, new TestModel({}), resource);
        expect(TestModel.get).toBeCalledWith(1);
    });

    it('renders the error page when BaseModel instance is not provided.', () => {
        class TestEditPage extends React.Component<void, void> {
            constructor() {
                super();
            };
        }

        renderer.render(
            <EditPageImpl
                params={{resource: resource}}
                instance={new TestEditPage()}
                location={{pathname: ''}}
                createInstance={() => {}}
            />
        );
        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page.type).toEqual(ErrorPage);
        expect(page.props.message).toEqual(PAGE_NOT_FOUND);
    });
});
