jest.unmock('../src/components-stateful/EditPage');
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {EditPageImpl, EditPageProps, EditPage} from '../src/components-stateful/EditPage';
import {BaseModel, DefaultModel} from '../src/models/BaseModel';
import {IInstanceContainerProps} from '../src/interfaces/';
import {IGenericEditPageProps} from '../src/components/CRUD/GenericEditPage';
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {INSTANCE_NOT_FOUND} from '../src/constants';
import {IShallowTestUtils} from '../src/interfaces/';
import {IInitializerData} from './../src/utils/initializeTestCase';
import {ComponentService} from '../src/utils/componentService';
import {GenericEditPage} from '../src/components/CRUD/GenericEditPage';
import {ModelPropTypes} from '../src/models/ModelPropTypes';
import {configureStore}from '../src/store/';
import {modelReducer} from '../src/reducers/modelReducer';
import {ModelService} from '../src/utils/modelService';
import {createStore} from 'redux';
import {ErrorPage} from '../src/components/ErrorPage';
import {Provider} from 'react-redux';
import {resolver} from '../src/resolver';
import {fromJS} from 'immutable';
import {store} from '../src/store/';
import ClassType = __React.ClassType;
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
let unroll = require<any>('unroll');

unroll.use(it);

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

    let path: string = 'edit';
    let resourceID: string = '1';
    let { resource, instances }: IInitializerData = initializeTestCase();
    let renderer: React.ShallowRenderer;
    let createPath: string = 'create/page';
    let editPath: string = 'edit/page';

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        BaseModel.get = jest.fn<typeof BaseModel.get>();
    });

    /**
     * TODO uncomment this when a function being called by a mocked function is mocked.
     */
    // unroll('renders an EditPage on a #path path', (done, testArgs) => {
    //     // let createInstance: jest.Mock<() => {}> = jest.fn<() => {}>();
    //     renderer.render(
    //         <EditPageImpl
    //             params={{resource: resource, resourceID: resourceID}}
    //             instance={instances[resource]}
    //             location={{pathname: testArgs.path}}
    //         />
    //     );

    //     // let page = renderer.getRenderOutput();
    //     // expect(page).toBeTruthy();
    //     // let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
    //     // expect(renderedPage.props.location.pathname).toBe(testArgs.path);
    //     // expect(renderedPage.props.params.resource).toEqual(resource);
    //     // expect(renderedPage.props.params.resourceID).toEqual(resourceID);
    //     // expect(renderedPage.props.instance).toEqual(instances[resource]);
    //     // expect(renderedPage.props.isCreatePage).toEqual(testArgs.isCreatePage);
    //     // if (testArgs.path === createPath) {
    //     //     let Model: typeof BaseModel = ModelService.getModel(resource);
    //     //     expect(createInstance).toBeCalledWith(new Model({}));
    //     // }
    //     done();
    // }, [
    //     ['path', 'isCreatePage'],
    //     [editPath, false],
    //     [createPath, true]
    // ]);

    it('renders a simple EditPage without a resourceID', () => {
        renderer.render(
            <EditPageImpl
                params={{resource: resource}}
                instance={instances[resource]}
                location={{pathname: ''}}
            />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();

        expect(page).toBeTruthy();
        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
        generalEditPageTests(renderedPage, instances[resource], resource);
        expect(BaseModel.get).not.toBeCalled();
    });

    it('renders the EditPage without any props', () => {
        renderer.render(<EditPageImpl/>);

        let page: React.ReactElement<EditPageProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        expect(page.props.location.pathname).toBe('');
        expect(page.props.params.resource).toBe('');
        expect(page.props.params.resourceID).toBe('');
        expect(page.props.instance).toEqual(new DefaultModel({}));
        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
        generalEditPageTests(renderedPage, new DefaultModel({}), '');
        expect(BaseModel.get).not.toBeCalled();
    });

    it('renders an EditPage with user implemented EditPage and Model registered', () => {
        class AbcEditPage extends React.Component<void, void> {
            static resourceName = 'abc';
            render() {
                return(
                    <div></div>
                );
            }
        }
        class AbcModel extends BaseModel {
            static resourceName = 'abc';
            static propTypes = {
                id: ModelPropTypes.NUMBER()
            };
            static defaultProps = {
                id: 0
            };
            constructor(data) {
                super(data);
            }
        }

        ModelService.register(AbcModel);
        ComponentService.register(AbcEditPage, 'edit');

        expect(resolver.has('abcmodel')).toEqual(true);
        expect(resolver.get('abcmodel')).toEqual(AbcModel);
        expect(resolver.has('abcedit')).toEqual(true);
        expect(resolver.get('abcedit')).toEqual(AbcEditPage);

        renderer.render(
            <EditPageImpl params={{resource: 'abc', resourceID: resourceID}}  instance={new AbcModel({})}/>
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        expect(page.props.params.resource).toEqual('abc');
        expect(page.props.params.resourceID).toEqual('1');
        expect(page.props.instance).toEqual(new AbcModel({}));
        let renderedPage = ShallowTestUtils.findWithType(page, AbcEditPage);
        generalEditPageTests(renderedPage, new AbcModel({}), 'abc');
        expect(AbcModel.get).toBeCalled();
    });

    it('renders the error page when BaseModel instance is not provided.', () => {
        class TestModel {}

        renderer.render(
            <EditPageImpl
                params={{resource: resource}}
                instance={new TestModel()}
                location={{pathname: ''}}
            />
        );
        let page: React.ReactElement<{message: string}> = renderer.getRenderOutput();
        expect(page.type).toEqual(ErrorPage);
        expect(page.props.message).toEqual(INSTANCE_NOT_FOUND);
    });

    describe('Test EditPage with the store', () => {
        class TestModel extends BaseModel {
            static resourceName = 'test';
            static propTypes = {
                id: ModelPropTypes.NUMBER()
            };
            static defaultProps = {
                id: 0
            };
            constructor(data) {
                super(data);
            }
        }
        ModelService.register(TestModel);
        let renderedInstance: TestModel = new TestModel({});
        renderedInstance.$save = jest.fn<typeof renderedInstance.$save>();
        renderedInstance.$update = jest.fn<typeof renderedInstance.$update>();
        renderedInstance.$delete = jest.fn<typeof renderedInstance.$delete>();
        
        it('renders the EditPage with the store', () => {
            ModelService.getModel = jest.fn<any>();
            BaseModel.get = jest.fn<typeof BaseModel.get>();
            let storeInstances: {testCreate?: BaseModel, testEdit?: BaseModel} = {};
            storeInstances['testEdit'] = renderedInstance;
            
            let page: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
                <Provider store = {configureStore({instances: fromJS(storeInstances)})}>
                    <EditPage
                        params={{resource: resource, resourceID: resourceID}}
                        location={{pathname: 'edit'}}
                    />
                </Provider>
            );
        });

        // unroll('renders the EditPage with the store on the #path path', (done, testArgs) => {

        //     let storeInstances: {testCreate?: BaseModel, testEdit?: BaseModel} = {};
        //     storeInstances[testArgs.key] = renderedInstance;
        //     // let page: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
        //     //     <Provider store = {configureStore({instances: fromJS(storeInstances)})}>
        //     //         <EditPage
        //     //             params={{resource: resource, resourceID}}
        //     //             location={{pathname: testArgs.path}}
        //     //         />
        //     //     </Provider>
        //     // );

        //     // expect(page).toBeTruthy();
        //     // expect(TestModel.get).toBeCalledWith(1);
        //     // let renderedPage: React.ReactElement<IGenericEditPageProps> = TestUtils
        //     //     .findRenderedComponentWithType
        //     //     (
        //     //         page,
        //     //         GenericEditPage as any
        //     //     ) as React.ReactElement<IGenericEditPageProps>;

        //     // expect(renderedPage).toBeTruthy();
        //     // expect(renderedPage.props.isCreatePage).toEqual(testArgs.isCreatePage);
        //     // expect(renderedPage.props.location.pathname).toEqual(testArgs.path);
        //     // expect(renderedPage.props.params.resource).toEqual(resource);
        //     // expect(renderedPage.props.params.resourceID).toEqual(resourceID);

        //     // // Submitting form in GenericEditPage.
        //     // TestUtils.Simulate.submit(TestUtils.findRenderedDOMComponentWithTag(page, 'form'));
        //     // expect(renderedInstance[testArgs.saveMethod]).toBeCalledWith(true, testArgs.key);
        //     // done();

        //     // // Clicking delete button in GenericEditPage.
        //     // TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(page, 'button')[1]);
        //     // expect(renderedInstance.$delete).toBeCalledWith(true, testArgs.key);
        // }, [
        //     ['path', 'key', 'saveMethod', 'isCreatePage'],
        //     [editPath, `${resource}Edit`, '$update', false],
        //     [createPath, `${resource}Create`, '$save', true]
        // ]);

    });

});
