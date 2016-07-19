import {IInitializerData} from './../src/utils/initializeTestCase';
jest.unmock('../src/containers/CreatePage');
import {CreatePageImpl} from '../src/containers/CreatePage';
import {initializeTestCase} from './../src/utils/initializeTestCase';
import * as React from 'react';
import {GenericEditPage} from '../src/components/CRUD/GenericEditPage';
import {BaseModel} from '../src/models/BaseModel';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import {ComponentService} from '../src/utils/componentService';
import {resolver} from '../src/resolver';
import * as TestUtils from 'react-addons-test-utils';
import {ICreatePageProps} from '../src/containers/CreatePage';
import {ModelService} from '../src/utils/modelService';

describe('test CreatePage', () => {
    let renderer: React.ShallowRenderer, resource: string, instances: Object,
        fetchInstanceData: (...args: any[]) => void, handleSubmit: Function, handleDelete: Function;

    beforeEach(() => {
        let data = initializeTestCase();
        renderer = data.renderer;
        resource = data.resource;
        instances = data.instances;
        fetchInstanceData = data.fetchInstanceData;
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

        let page: React.ReactElement<ICreatePageProps> = renderer.getRenderOutput();

        expect(page).toBeTruthy();
        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
        expect(renderedPage).toBeTruthy();
        // expect(renderedPage.props.handleSubmit.toString()).toEqual(handleSubmit.toString());
        expect(renderedPage.props.handleDelete).toBeUndefined();
        expect(renderedPage.props.instance).toEqual(instances[resource]);
        expect(renderedPage.props.resource).toEqual(resource);
        expect(fetchInstanceData).toBeCalled();

    });

    it('renders an CreatePage without any props', () => {
        renderer.render(
            <CreatePageImpl />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.instance).toEqual(new BaseModel({}));
        // expect(renderedPage.props.handleSubmit.toString()).toEqual(handleSubmit.toString());
        expect(renderedPage.props.handleDelete).toBeUndefined();
        expect(renderedPage.props.resource).toEqual('');

    });

    it('renders an CreatePage with user implemented CreatePage registered', () => {
        class TestCreatePage extends React.Component<{}, {}> {
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
        ComponentService.register(TestCreatePage);

        expect(resolver.has('testmodel')).toEqual(true);
        expect(resolver.get('testmodel')).toEqual(TestModel);
        expect(resolver.has('testcreatepage')).toEqual(true);
        expect(resolver.get('testcreatepage')).toEqual(TestCreatePage);

        renderer.render(
            <CreatePageImpl params={{resource: resource}} />
        );

        let page = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage = ShallowTestUtils.findWithType(page, TestCreatePage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.instance).toEqual(new TestModel({}));
        expect(renderedPage.props.resource).toEqual(resource);
        // expect(renderedPage.props.handleSubmit.toString()).toEqual(handleSubmit.toString());
        expect(renderedPage.props.handleDelete).toBeUndefined();

    });

});
