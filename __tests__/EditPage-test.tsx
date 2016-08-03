import {GenericEditPage} from '../src/components/CRUD/GenericEditPage';
jest.unmock('../src/components-stateful/EditPage');
import {EditPageImpl} from '../src/components-stateful/EditPage';
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

function generalEditPageTests(renderedPage, instance: BaseModel, resource: string ): void {
    expect(renderedPage).toBeTruthy();
    expect(renderedPage.props.instance).toEqual(instance);
    expect(renderedPage.props.resource).toEqual(resource);
    // expect(renderedPage.props.handleSubmit.toString()).toEqual(handleSubmit.toString());
    // expect(renderedPage.props.handleDelete.toString()).toEqual(handleDelete.toString());
}

describe('Test EditPage', () => {
    let { renderer, resource, instances, fetchInstanceData }: IInitializerData = initializeTestCase();
    let handleSubmit = (instance: BaseModel, e: Event): void => {
        e.preventDefault();
        instance.$update();
    };
    let handleDelete = (instance: BaseModel) : void => {
        instance.$delete();
    };

    it('renders a simple Edit Page', () => {
        renderer.render(
        <EditPageImpl
                params={{resource: resource}}
                instances={instances}
                fetchInstanceData={fetchInstanceData}
            />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();

        expect(page).toBeTruthy();
        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
        generalEditPageTests(renderedPage, instances[resource], resource);
        expect(fetchInstanceData).toBeCalled();

    });

    it('renders an EditPage without any props', () => {
        renderer.render(
            <EditPageImpl />
        );

        let page: React.ReactElement<IInstanceContainerProps> = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage = ShallowTestUtils.findWithType(page, GenericEditPage);
        generalEditPageTests(renderedPage, new BaseModel({}), '');
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
            <EditPageImpl params={{resource: resource}}  />
        );

        let page = renderer.getRenderOutput();
        expect(page).toBeTruthy();

        let renderedPage = ShallowTestUtils.findWithType(page, TestEditPage);
        generalEditPageTests(renderedPage, new TestModel({}), resource);

    });

});
