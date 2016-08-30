import {GenericShowPage} from '../src/components/CRUD/GenericShowPage';
jest.unmock('../src/components-stateful/ShowPage');
import {ShowPageImpl, ShowPage} from '../src/components-stateful/ShowPage';
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
import configureStore from '../src/store/store';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';
import {PAGE_NOT_FOUND} from '../src/constants';
import {ErrorPage} from '../src/components/ErrorPage';

describe('Test ShowPage', () => {
    let initializerData: IInitializerData = initializeTestCase();
    let renderer: React.ShallowRenderer;
    let resource: string = initializerData.resource;
    let resourceID: number = 1;
    let instances: Object = initializerData.instances;

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        BaseModel.get = jest.fn<Function>();
    });

    it('renders a ShowPage with the store', () => {
        let page: React.Component<void, void> = TestUtils.renderIntoDocument<React.Component<void, void>>(
            <Provider store={configureStore({instances: fromJS({testEditPage: {}})})} >
                <ShowPage params={{resource, resourceID}}/>
            </Provider>
        );

        expect(page).toBeTruthy();
        let renderedPage: React.ReactElement<IInstanceContainerProps> = TestUtils
            .findRenderedComponentWithType(page, GenericShowPage) as React.ReactElement<IInstanceContainerProps>;
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.resource).toEqual(resource);
        expect(TestUtils.findRenderedComponentWithType(page, GenericShowPage));
        expect(BaseModel.get).toBeCalledWith(resourceID);

    });


    function testRenderedPageProps(page: React.ReactElement<IInstanceContainerProps>, instance: BaseModel
            , resourceParam: string) {
        let renderedPage = ShallowTestUtils.findWithType(page, GenericShowPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.resource).toEqual(resourceParam);
        expect(renderedPage.props.instance).toEqual(instance);
        expect(BaseModel.get).toBeCalled();
    }

    it('renders a simple Show Page', () => {
        renderer.render(
            <ShowPageImpl
                params={{resource: resource}}
                instance={instances[resource]}
            />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        expect(page.props.resource).toBe(resource);
        expect(page.props.instance).toEqual(instances[resource]);
        testRenderedPageProps(page, instances[resource], resource);
    });

    it('renders an ShowPage without any props', () => {
        renderer.render(
            <ShowPageImpl />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        expect(page.props.resource).toBe('');
        expect(page.props.instance).toEqual(new BaseModel({}));
        testRenderedPageProps(page, new BaseModel({}), '');
    });

    it('renders an ShowPage with user implemented ShowPage registered', () => {
        class TestShowPage extends React.Component<{}, {}> {}
        class TestModel extends BaseModel {
            constructor(data) {
                super(data);
            }
        }

        ModelService.register(TestModel);
        ComponentService.register(TestShowPage);

        expect(resolver.has('testmodel')).toEqual(true);
        expect(resolver.get('testmodel')).toEqual(TestModel);
        expect(resolver.has('testshowpage')).toEqual(true);
        expect(resolver.get('testshowpage')).toEqual(TestShowPage);

        renderer.render(
            <ShowPageImpl params={{resource: resource}} instance={new TestModel({})}/>
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage = ShallowTestUtils.findWithType(page, TestShowPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.instance).toEqual(new TestModel({}));
        expect(renderedPage.props.resource).toEqual(resource);
    });

    it('renders the error page when BaseModel instance is not provided.', () => {
        class TestPage {}

        renderer.render(
            <ShowPageImpl params={{resource: resource}} instance={new TestPage()}/>
        );
        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page.type).toEqual(ErrorPage);
        expect(page.props.message).toEqual(PAGE_NOT_FOUND);
    });
});
