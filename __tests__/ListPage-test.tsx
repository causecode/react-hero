import {IInitializerData} from './../src/utils/initializeTestCase';
jest.unmock('../src/containers/ListPage');
import {ListPage} from '../src/containers/ListPage';
import * as React from 'react';
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {GenericListPage} from '../src/components/CRUD/GenericListPage';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import {ComponentService} from '../src/utils/componentService';
import {IShallowTestUtils} from '../src/interfaces/interfaces';

describe('test List Page', () => {
    let renderer: React.ShallowRenderer, resource: string, instances: Object,
        fetchInstanceData: (...args: any[]) => void, handleSubmit: Function, handleDelete: Function;

    beforeEach(() => {
        let data: IInitializerData = initializeTestCase();
        renderer = data.renderer;
        instances = data.instances;
        resource = data.resource;
        fetchInstanceData = data.fetchInstanceData;
    });

    it('renders a simple ListPage', () => {
        renderer.render(
            <ListPage params={{resource: resource}} />
        );

        let page = renderer.getRenderOutput();

        expect(page).toBeTruthy();
        let renderedPage = ShallowTestUtils.findWithType(page, GenericListPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.resource).toEqual(resource);
    });

    it('renders a List Page without any props', () => {
        renderer.render(
            <ListPage />
        );

        let page = renderer.getRenderOutput();

        expect(page).toBeTruthy();
    });

    it('renders a List Page with user Defined ListPage', () => {
        class TestListPage extends React.Component<{}, {}> {
            render() {
                return(
                    <div></div>
                );
            }
        }

        ComponentService.register(TestListPage);

        renderer.render(
           <ListPage params={{resource: resource}}/>
        );

        let page = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        let renderedPage = ShallowTestUtils.findWithType(page, TestListPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.resource).toEqual(resource);

    });

});
