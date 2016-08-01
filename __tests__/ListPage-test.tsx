import {IInitializerData} from './../src/utils/initializeTestCase';
jest.unmock('../src/components-stateful/ListPage');
import {ListPage} from '../src/components-stateful/ListPage';
import * as React from 'react';
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {GenericListPage} from '../src/components/CRUD/GenericListPage';
const ShallowTestUtils: IShallowTestUtils = require<IShallowTestUtils>('react-shallow-testutils');
import {ComponentService} from '../src/utils/componentService';
import {IShallowTestUtils} from '../src/interfaces/interfaces';

describe('test List Page', () => {
    let { renderer, instances, resource, fetchInstanceData }: IInitializerData = initializeTestCase();

    beforeEach(() => {
        let data: IInitializerData = initializeTestCase();
        renderer = data.renderer;
        instances = data.instances;
        resource = data.resource;
        fetchInstanceData = data.fetchInstanceData;
    });

    function testPageAndResource(innerPage: React.ComponentClass<{}>) {
        let page = renderer.getRenderOutput();
        expect(page).toBeTruthy();
        let renderedPage: React.ReactElement<{resource: string}> = ShallowTestUtils.findWithType(page, innerPage);
        expect(renderedPage).toBeTruthy();
        expect(renderedPage.props.resource).toEqual(resource);
    }

    it('renders a simple ListPage', () => {
        renderer.render(
            <ListPage params={{resource: resource}} />
        );

        testPageAndResource(GenericListPage);
    });

    it('renders a List Page with user Defined ListPage', () => {
        class TestListPage extends React.Component<{}, {}> {}

        ComponentService.register(TestListPage);

        renderer.render(
            <ListPage params={{resource: resource}}/>
        );

        testPageAndResource(TestListPage);
    });

    it('renders a List Page without any props', () => {
        renderer.render(
        <ListPage />
        );

        let page = renderer.getRenderOutput();
        expect(page).toBeTruthy();
    });

});
