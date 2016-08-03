import {GenericShowPage} from '../src/components/CRUD/GenericShowPage';
jest.unmock('../src/components-stateful/ShowPage');
import {ShowPageImpl} from '../src/components-stateful/ShowPage';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {BaseModel} from '../src/models/BaseModel';
import {fetchInstanceData} from '../src/actions/modelActions';
import {ComponentService} from '../src/utils/componentService';
import {ModelService} from '../src/utils/modelService';
import {resolver} from '../src/resolver';
import {IInitializerData} from './../src/utils/initializeTestCase';
import {IShallowTestUtils} from '../src/interfaces/interfaces';
import {IInstanceContainerProps} from '../src/interfaces/interfaces';

describe('Test ShowPage', () => {
    let initializerData: IInitializerData = initializeTestCase();
    let renderer: React.ShallowRenderer = initializerData.renderer;
    let resource: string = initializerData.resource;
    let instances: Object = initializerData.instances;
    let fetchInstanceData: (...args: any[]) => void;

    beforeEach(() => {
        fetchInstanceData = jest.fn<(...args: any[]) => void>();
    });

    function testRenderedPageProps(page: React.ReactElement<IInstanceContainerProps>, instance: BaseModel
            , resourceParam: string) {
        let renderedPage = ShallowTestUtils.findWithType(page, GenericShowPage);

        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.resource).toEqual(resourceParam);
        expect(renderedPage.props.instance).toEqual(instance);
    }

    it('renders a simple Show Page', () => {
        renderer.render(
            <ShowPageImpl
                params={{resource: resource}}
                instances={instances}
                fetchInstanceData={fetchInstanceData}
            />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();

        expect(page).toBeTruthy();
        testRenderedPageProps(page, instances[resource], resource);
        expect(fetchInstanceData).toBeCalled();

    });

    it('renders an ShowPage without any props', () => {
        renderer.render(
            <ShowPageImpl />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();
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
            <ShowPageImpl params={{resource: resource}} />
        );

        let page = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage = ShallowTestUtils.findWithType(page, TestShowPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.instance).toEqual(new TestModel({}));
        expect(renderedPage.props.resource).toEqual(resource);

    });

});

