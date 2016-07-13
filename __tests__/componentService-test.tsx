jest.unmock('../src/utils/componentService');
import {ComponentService} from '../src/utils/componentService';
import {resolver} from '../src/resolver';
import * as React from 'react';
import GenericListPage from '../src/components/CRUD/GenericListPage';
import GenericShowPage from '../src/components/CRUD/GenericShowPage';
import GenericEditPage from '../src/components/CRUD/GenericEditPage';

describe('Test Component Service', () => {
    class TestComponent extends React.Component<{}, {}> {
        render() {
            return (<div></div>);
        }
    }

    class TestListPage extends React.Component<{}, {}> {
        render() {
            return (<div></div>);
        }
    }

    class TestEditPage extends React.Component<{}, {}> {
        render() {
            return (<div></div>);
        }
    }

    class TestShowPage extends React.Component<{}, {}> {
        render() {
            return (<div></div>);
        }
    }

    class TestCreatePage extends React.Component<{}, {}> {
        render() {
            return (<div></div>);
        }
    }

    it('registers the component in the React DI resolver object', () => {
        ComponentService.register(TestComponent);

        expect(resolver.has('testcomponent')).toBe(true);
        expect(resolver.get('testcomponent')).toEqual(TestComponent);
    });


    describe('Component Service retrieval functions', () => {

        beforeEach(() => {
            ComponentService.register(TestComponent);
            ComponentService.register(TestListPage);
            ComponentService.register(TestEditPage);
            ComponentService.register(TestShowPage);
            ComponentService.register(TestCreatePage);
        });

        it('checks if the specified component has been registered', () => {

            expect(ComponentService.hasComponent('test', 'component')).toBe(true);
            expect(ComponentService.hasComponent('test')).toBe(false);
            expect(ComponentService.hasComponent('')).toBe(false);

        });

        it('checks if the specified Pages have been registered', () => {

            expect(ComponentService.hasListPage('test')).toBe(true);
            expect(ComponentService.hasEditPage('test')).toBe(true);
            expect(ComponentService.hasShowPage('test')).toBe(true);
            expect(ComponentService.hasCreatePage('test')).toBe(true);

        });

        it('retrieves the specified Pages', () => {
            expect(ComponentService.getListPage('test')).toEqual(TestListPage);
            expect(ComponentService.getEditPage('test')).toEqual(TestEditPage);
            expect(ComponentService.getShowPage('test')).toEqual(TestShowPage);
            expect(ComponentService.getCreatePage('test')).toEqual(TestCreatePage);
            expect(ComponentService.getListPage('TEst')).toEqual(TestListPage);
            expect(ComponentService.getEditPage('TEst')).toEqual(TestEditPage);
            expect(ComponentService.getShowPage('TEst')).toEqual(TestShowPage);
            expect(ComponentService.getCreatePage('TEst')).toEqual(TestCreatePage);

            expect(ComponentService.getListPage('abc')).toEqual(GenericListPage);
            expect(ComponentService.getShowPage('abc')).toEqual(GenericShowPage);
            expect(ComponentService.getEditPage('abc')).toEqual(GenericEditPage);
            expect(ComponentService.getCreatePage('abc')).toEqual(GenericEditPage);

            expect(ComponentService.getListPage('')).toEqual(GenericListPage);
            expect(ComponentService.getShowPage('')).toEqual(GenericShowPage);
            expect(ComponentService.getEditPage('')).toEqual(GenericEditPage);
            expect(ComponentService.getCreatePage('')).toEqual(GenericEditPage);

        });

    });
});
