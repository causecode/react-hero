jest.unmock('../src/utils/componentService');
import {ComponentService} from '../src/utils/componentService';
import {resolver} from '../src/resolver';
import * as React from 'react';
import {GenericListPage} from '../src/components/CRUD/GenericListPage';
import {GenericShowPage} from '../src/components/CRUD/GenericShowPage';
import {GenericEditPage} from '../src/components/CRUD/GenericEditPage';
import {getEnvironment} from '../src/utils/appService';
const unroll: any = require<any>('unroll');

unroll.use(it);

class TestListPage extends React.Component<void, void> {}
class TestEditPage extends React.Component<void, void> {}
class TestShowPage extends React.Component<void, void> {}
class TestCreatePage extends React.Component<void, void> {}
let pages = {
    TestListPage,
    TestEditPage,
    TestShowPage,
    TestCreatePage,
    GenericEditPage,
    GenericShowPage,
    GenericListPage,
    GenericCreatePage: GenericEditPage
};

describe('Test Component Service', () => {

    describe('Component Service retrieval functions', () => {

        beforeEach(() => {
            ComponentService.register(TestListPage, 'list');
            ComponentService.register(TestEditPage, 'edit');
            ComponentService.register(TestShowPage, 'show');
            ComponentService.register(TestCreatePage, 'create');
        });

        it('checks if the specified component has been registered', () => {

            expect(ComponentService.hasComponent('test', 'component')).toBe(true);
            expect(ComponentService.hasComponent('test')).toBe(false);
            expect(ComponentService.hasComponent('')).toBe(false);

        });

        unroll('checks if #methodName returns true if component has been registered', (done, testArgs) => {
            expect(ComponentService[testArgs.methodName]('test')).toEqual(true);
            expect(ComponentService[testArgs.methodName]('aaaa')).toEqual(false);
            done();
        }, [
                ['methodName'],
                ['hasListPage'],
                ['hasEditPage'],
                ['hasShowPage'],
                ['hasCreatePage']
        ]);

        unroll('retrieves the #type Pages', (done, testArgs) => {
            expect(ComponentService[`get${testArgs.type}Page`]('test')).toEqual(pages[`Test${testArgs.type}Page`]);
            expect(ComponentService[`get${testArgs.type}Page`]('TEst')).toEqual(pages[`Test${testArgs.type}Page`]);
            expect(ComponentService[`get${testArgs.type}Page`]('abc')).toEqual(pages[`Generic${testArgs.type}Page`]);
            expect(ComponentService[`get${testArgs.type}Page`]('')).toEqual(pages[`Generic${testArgs.type}Page`]);
            done();
        }, [
                ['type'],
                ['List'],
                ['Create'],
                ['Edit'],
                ['Show']
        ]);

        it('logs a warning in the development Environment if component is not found', () => {
            let oldEnv: string = getEnvironment();
            process.env.NODE_ENV = 'development';
            console.warn = jest.fn<typeof console.warn>();
            ComponentService.getListPage('abc');
            expect(console.warn).toBeCalledWith(`Cannot find Component ` +
                `AbcListpage, Make sure you have registered it.` +
                ` Using GenericListpage instead.`);
            process.env.NODE_ENV = oldEnv;
        });

    });
});
