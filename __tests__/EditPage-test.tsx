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
}

describe('Test EditPage', () => {

    let path: string = 'edit';
    let resourceID: string = '1';
    let {resource, instances}: IInitializerData = initializeTestCase();
    let renderer: React.ShallowRenderer;
    let createPath: string = 'create/page';
    let editPath: string = 'edit/page';

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        BaseModel.get = jest.fn<typeof BaseModel.get>();
    });

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
        let renderedPage: React.ComponentClass<IGenericEditPageProps> = 
                ShallowTestUtils.findWithType(page, GenericEditPage);
        generalEditPageTests(renderedPage, new DefaultModel({}), '');
        expect(BaseModel.get).not.toBeCalled();
    });

    it('renders an EditPage with user implemented EditPage and Model registered', () => {
        class AbcEditPage extends React.Component<void, void> {
            static resourceName: string = 'abc';
            render() {
                return(
                    <div></div>
                );
            }
        }
        class AbcModel extends BaseModel {
            static resourceName: string = 'abc';
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
            static resourceName: string = 'test';
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

    });

});
