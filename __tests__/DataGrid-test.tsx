jest.unmock('../src/components/PagedList/DataGrid');
jest.mock('../src/utils/appService');

import * as React from 'react';
import * as AppService from '../src/utils/appService';
import {ReactWrapper, mount, ShallowWrapper, shallow, EnzymePropSelector} from 'enzyme';
import {Provider} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {ICheckboxReducer, CSS} from '../src/interfaces';
import {store, configureStore} from '../src/store';
import {userModelStephenInstance, UserModel} from './testData/UserModel';
import {toggleCheckbox} from '../src/actions/checkboxActions';
import {TestModel, userModelBruceInstance} from './testData/TestModel';
import {IDataGridProps, DataGrid, DataGridImpl} from '../src/components/PagedList/DataGrid';
import '../src/init';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for DataGrid', () => {

    let testFunction: jest.Mock<void> = jest.fn<void>();
    const style: CSS = {color: 'black'};

    let instanceList: TestModel[] = [userModelBruceInstance];
    let totalCount: number = 1;
    let checkboxReducer: ICheckboxReducer = {selectedIds: [1], selectAllOnPage: false, selectAll: false};

    let selectAllRecords: jest.Mock<void> = jest.fn<void>();
    let selectAllRecordsOnPage: jest.Mock<void> = jest.fn<void>();
    let setChecked: jest.Mock<void> = jest.fn<void>();
    let setUnchecked: jest.Mock<void> = jest.fn<void>();

    const dataGrid: ShallowWrapper<IDataGridProps, void> = shallow<IDataGridProps, void> (
            <DataGridImpl
                    totalCount={20}
                    max={10}
                    offset={0}
                    instanceList={[userModelBruceInstance]}
                    properties={userModelBruceInstance.properties}
                    setChecked={setChecked}
                    showDefaultActions={true}
                    setUnchecked={setUnchecked}
                    selectAllRecords={selectAllRecords}
                    selectAllRecordsOnPage={selectAllRecordsOnPage}
                    handleRecordDelete={testFunction}
                    style={style}
            />
    );

    unroll('should render #count #component elements', (
        done: () => void,
        args: {component: string, selector: EnzymePropSelector, count: number}
    ) => {
        expect(dataGrid.find(args.selector).length).toBe(args.count);
        done();
    }, [
        ['component', 'selector', 'count'],
        ['Link', Link, 2],
        ['Table', Table, 1],
        ['checkbox', 'input[type="checkbox"]', 2],
        ['totalCount', '#totalCount', 1],
    ]);

    unroll('should call handleChange when checkbox is checked or unchecked', (
        done: () => void,
        args: {checkbox: ShallowWrapper<IDataGridProps, void>, method: jest.Mock<void>}
    ) => {
        args.checkbox.simulate('change', {target: {checked: true}});
        expect(args.method).toBeCalled();

        args.checkbox.simulate('change', {target: {checked: false}});
        expect(selectAllRecordsOnPage).toBeCalled();
        done();
    }, [
        ['checkbox', 'method'],
        [dataGrid.find('input[type="checkbox"]').at(0), selectAllRecordsOnPage],
        [dataGrid.find('input[type="checkbox"]').at(1), setChecked],
    ]);

    it('should delete the data when delete icon is clicked.', (): void => {
        dataGrid.find('a').simulate('click');
        expect(testFunction).toBeCalled();
    });

    unroll('should not render DataGrid content when instanceList is #status.', (
        done: () => void,
        args: {status: string, propValue: any}
    ): void => {
        dataGrid.setProps({instanceList: args.propValue});
        expect(dataGrid.find('Table').length).toBe(0);

        done();
    }, [
        ['status', 'propValue'],
        ['null', null],
        ['empty', []],
    ]);

    describe('When getHTML and getRowStyle method is defined for any property inside model', (): void => {
        let checkbox: ICheckboxReducer = {selectedIds: [1], selectAll: false, selectAllOnPage: false};

        AppService.getInnerData = jest.fn();

        selectAllRecords = jest.fn(() => {
            return {
                type: 'DUMMY',
                payload: 1,
            };
        });

        toggleCheckbox = jest.fn(() => {
            return {
                type: 'DUMMY',
                payload: false,
            };
        });

        store.dispatch = jest.fn();

        let userDataGrid: ShallowWrapper<IDataGridProps, void> = shallow<IDataGridProps, void> (
                <DataGridImpl
                        instanceList={[userModelStephenInstance]}
                        properties={Object.keys(userModelStephenInstance.properties)}
                        style={style}
                />
        );

        it('should render property as HTML element when method is defined inside model for that property', () => {
            expect(userDataGrid.find('Table').dive().find('Link').length).toBe(4);
            let renderedAsLink: boolean = false;
            userDataGrid.find('Table').dive().find('Link').forEach((link) => {
                if (link.props()[`to`] === '/stephen' || link.props()[`to`] === '/queensConsolidated') {
                    renderedAsLink = true;
                }
            });
            expect(renderedAsLink).toBeTruthy();
        });

        it('should call getRowStyle Method', (): void => {
            const tableRow = userDataGrid.find('Table').dive().find('tr').at(1);
            expect(tableRow.prop('style').color).toBe('#ffffff');
        });
    });

    describe('Tests for different actions.', (): void => {

        class TestActionComponent extends React.Component<void, void> {
            render(): JSX.Element {
                return (
                    <button id="testActionComponent">testAction</button>
                );
            }
        }

        let testActionElement = (instance: any): JSX.Element => {
            return <button id="customAction">custom action</button>;
        };

        /**
         * Using different component tree for each test suite because once the component is mounted,
         * even after changing the props(using setProps), the tree failed to update.
         * Tried using componentTree.update() and beforeEach() as well.
         */
        describe('When showDefaultActions is false and custom actions are not present', (): void => {
            let componentTree: ReactWrapper<IDataGridProps, void> = mount<IDataGridProps, void>(
                    <Provider store={configureStore ({checkbox: checkboxReducer})}>
                        <DataGrid
                                instanceList={instanceList}
                                totalCount={totalCount}
                                properties={userModelBruceInstance.properties}
                                showDefaultActions={false}
                                style={style}
                        />
                    </Provider>
            );

            it('should not render actions.', (): void => {
                expect(componentTree.find(Link).length).toEqual(0);
            });
        });

        describe('When custom action prop is passed.', (): void => {

            unroll('should render the custom action #title.', (done: () => void, args): void => {
                let componentTree: ReactWrapper<IDataGridProps, void> = mount<IDataGridProps, void>(
                        <Provider store={configureStore ({checkbox: checkboxReducer})}>
                            <DataGrid
                                    instanceList={instanceList}
                                    totalCount={totalCount}
                                    properties={userModelBruceInstance.properties}
                                    customActions={args.propValue}
                                    style={style}
                            />
                        </Provider>
                );

                expect(componentTree.find(`#${args.buttonId}`).length).toEqual(1);
                done();
            }, [
                ['title', 'propValue', 'buttonId'],
                ['element', testActionElement, 'customAction'],
                ['component', TestActionComponent, 'testActionComponent'],
            ]);
        });

        describe('When custom action is not passed as a prop and custom action component is present.', (): void => {

            AppService.getActionComponent = jest.fn<React.ComponentClass<void>>((): React.ComponentClass<void> => {
                return TestActionComponent;
            });

            let componentTree: ReactWrapper<IDataGridProps, void> = mount<IDataGridProps, void>(
                    <Provider store={configureStore ({checkbox: checkboxReducer})}>
                        <DataGrid
                                instanceList={instanceList}
                                totalCount={totalCount}
                                properties={userModelBruceInstance.properties}
                                style={style}
                        />
                    </Provider>
            );

            it('should render the custom action component by dynamic lookup.', (): void => {
                expect(componentTree.find('#testActionComponent').length).toEqual(1);
                expect(AppService.getActionComponent).toBeCalled();
            });
        });
    });
});
