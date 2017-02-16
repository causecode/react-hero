jest.unmock('../src/components/PagedList/DataGrid');
jest.unmock('../src/utils/appService');

import * as React from 'react';
import * as AppService from '../src/utils/appService';
import {ReactWrapper, mount} from 'enzyme';
import {Provider} from 'react-redux';
import {store, configureStore} from '../src/store';
import {Link} from 'react-router';
import {Table} from 'react-bootstrap';
import {ICheckboxReducer} from '../src/interfaces';
import {IDataGridProps, DataGrid} from '../src/components/PagedList/DataGrid';
import {BaseModel} from '../src/models/BaseModel';
import {ModelPropTypes} from '../src/models/ModelPropTypes';
import '../src/init';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for DataGrid', () => {

    let testFunction: jest.Mock<void> = jest.fn<void>();

    class TestModel extends BaseModel {
        static resourceName: string = 'test';
        static propTypes = {
            id: ModelPropTypes.NUMBER(),
            name: ModelPropTypes.STRING()
        };
        static defaultProps = {
            id: 1,
            name: 'Flash'
        };
        constructor(props) {
            super(props);
        }
    }
    
    let testInstance: TestModel = new TestModel({id: 100, name: 'Mr. Robot'});
    let instanceList: TestModel[] = [testInstance];
    let totalCount: number = 1;
    let checkboxReducer: ICheckboxReducer = {selectedIds: [1], selectAllOnPage: false, selectAll: false};
    const dataGridComponent: ReactWrapper<IDataGridProps, void> = mount <IDataGridProps, void> (
        <Provider store={configureStore ({
            checkbox: checkboxReducer
         })}>
            <DataGrid 
                    instanceList={instanceList}
                    totalCount={totalCount}
                    properties={testInstance.properties}
                    handleRecordDelete={testFunction}
            />
        </Provider>
    );

    unroll('should render #count #component elements', (done, args) => {
        expect(dataGridComponent.find(args.selector).length).toBe(args.count);
        done();
    }, [
        ['component', 'selector', 'count'],
        ['Link', Link, 2],
        ['Table', Table, 1],
        ['checkbox', 'input[type="checkbox"]', 2]
    ]);

    it('It should delete the data when delete icon is clicked.', (): void => {
        dataGridComponent.find('#delete100').simulate('click');
        expect(testFunction).toBeCalled();
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
            let componentTree: ReactWrapper<IDataGridProps, void> = mount <IDataGridProps, void>(
                    <Provider store={configureStore ({checkbox: checkboxReducer})}>
                        <DataGrid 
                                instanceList={instanceList}
                                totalCount={totalCount}
                                properties={testInstance.properties}
                                showDefaultActions={false}
                        />
                    </Provider>
            );

            it('It should not render actions.', (): void => {
                expect(componentTree.find(Link).length).toEqual(0);
            });
        });

        describe('When custom action prop is passed.', (): void => {

            unroll('It should render the custom action #title.', (done: () => void, args): void => {
                let componentTree: ReactWrapper<IDataGridProps, void> = mount <IDataGridProps, void>(
                        <Provider store={configureStore ({checkbox: checkboxReducer})}>
                            <DataGrid 
                                    instanceList={instanceList}
                                    totalCount={totalCount}
                                    properties={testInstance.properties}
                                    customActions={args.propValue}
                            />
                        </Provider>
                );

                expect(componentTree.find(`#${args.buttonId}`).length).toEqual(1);
                done();
            }, [
                ['title', 'propValue', 'buttonId'],
                ['element', testActionElement, 'customAction'],
                ['component', TestActionComponent, 'testActionComponent']
            ]);
        });

        describe('When custom action is not passed as a prop and custom action component is present.', (): void => {
            
            AppService.getActionComponent = jest.fn<React.ComponentClass<void>>((): React.ComponentClass<void> => {
                return TestActionComponent;
            });

            let componentTree: ReactWrapper<IDataGridProps, void> = mount <IDataGridProps, void>(
                    <Provider store={configureStore ({checkbox: checkboxReducer})}>
                        <DataGrid 
                                instanceList={instanceList}
                                totalCount={totalCount}
                                properties={testInstance.properties}
                        />
                    </Provider>
            );

            it('It should render the custom action component by dynamic lookup.', (): void => {
                expect(componentTree.find('#testActionComponent').length).toEqual(1);
                expect(AppService.getActionComponent).toBeCalled();
            });
        });
        
    });
});
