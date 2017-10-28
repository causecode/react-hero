jest.unmock('../src/components-stateful/ShowPage');

import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import {IInstanceContainerProps} from '../src/interfaces';
import {ShowPageImpl, ShowPage} from '../src/components-stateful/ShowPage';
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {IShallowTestUtils} from '../src/interfaces';
import {ComponentService} from '../src/utils/componentService';
import {IInitializerData} from './../src/utils/initializeTestCase';
import {GenericShowPage} from '../src/components/CRUD/GenericShowPage';
import {configureStore} from '../src/store';
import {PAGE_NOT_FOUND} from '../src/constants';
import {ModelPropTypes} from '../src/models/ModelPropTypes';
import {ModelService} from '../src/utils/modelService';
import {ErrorPage} from '../src/components/ErrorPage';
import {BaseModel} from '../src/models/BaseModel';
import {resolver} from '../src/resolver';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';

const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');

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

    function testRenderedPageProps(page: React.ReactElement<IInstanceContainerProps>, instance: BaseModel
            , resourceParam: string) {
        let renderedPage = ShallowTestUtils.findWithType(page, GenericShowPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.resource).toEqual(resourceParam);
        expect(renderedPage.props.instance).toEqual(instance);
        expect(BaseModel.get).toBeCalled();
    }

    it('renders an ShowPage with user implemented ShowPage registered', () => {
        class TestShowPage extends React.Component<void, void> {
            static resourceName: string = 'test';
        }

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
        ComponentService.register(TestShowPage, 'show');

        expect(resolver.has('testmodel')).toEqual(true);
        expect(resolver.get('testmodel')).toEqual(TestModel);
        expect(resolver.has('testshow')).toEqual(true);
        expect(resolver.get('testshow')).toEqual(TestShowPage);

        renderer.render(
            <ShowPageImpl params={{resource: resource}} instance={new TestModel({})}/>
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage: React.ComponentClass<void> = ShallowTestUtils.findWithType(page, TestShowPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.instance).toEqual(new TestModel({}));
        expect(renderedPage.props.resource).toEqual(resource);
    });

    it('renders the error page when BaseModel instance is not provided.', () => {
        class TestPage {}

        renderer.render(
            <ShowPageImpl params={{resource: resource}} instance={new TestPage()}/>
        );
        let page: React.ReactElement<{message: string}> = renderer.getRenderOutput();
        expect(page.type).toEqual(ErrorPage);
        expect(page.props.message).toEqual(PAGE_NOT_FOUND);
    });
});
