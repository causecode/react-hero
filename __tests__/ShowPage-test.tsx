import GenericShowPage from '../src/components/CRUD/GenericShowPage';
jest.unmock('../src/containers/ShowPage');
import {ShowPageImpl} from '../src/containers/ShowPage';
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import {initializeTestCase} from './initializeTestCase';
import BaseModel from '../src/models/BaseModel';
import {fetchInstanceData} from '../src/actions/instanceActions';
import {ComponentService} from '../src/utils/componentService';
import {ModelService} from '../src/utils/modelService';
import {resolver} from '../src/resolver';
import {IInitializerData} from './initializeTestCase';

describe('Test ShowPage', () => {
    let renderer: React.ShallowRenderer, resource: string, instances: Object,
        fetchInstanceData: (...args: any[]) => void, handleSubmit: Function, handleDelete: Function;

    beforeEach(() => {
        let data: IInitializerData = initializeTestCase();
        renderer = data.renderer;
        resource = data.resource;
        instances = data.instances;
        fetchInstanceData = jest.fn<(...args: any[]) => void>();
    });

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
        let renderedPage = ShallowTestUtils.findWithType(page, GenericShowPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.resource).toEqual(resource);
        expect(renderedPage.props.instance).toEqual(instances[resource]);
        expect(fetchInstanceData).toBeCalled();

    });

    it('renders an ShowPage without any props', () => {
        renderer.render(
            <ShowPageImpl />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage = ShallowTestUtils.findWithType(page, GenericShowPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.instance).toEqual(new BaseModel({}));
        expect(renderedPage.props.resource).toEqual('');

    });

    it('renders an ShowPage with user implemented ShowPage registered', () => {
        class TestShowPage extends React.Component<{}, {}> {
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

