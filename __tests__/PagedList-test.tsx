jest.unmock('../src/components-stateful/PagedList');
jest.mock('../src/utils/appService');

import * as React from 'react';
import {fromJS} from 'immutable';
import {Link} from 'react-router';
import {Provider} from 'react-redux';
import {Pagination} from 'react-bootstrap';
import {ShallowWrapper, shallow, ReactWrapper, mount} from 'enzyme';
import {store, configureStore} from '../src/store';
import {setPage} from '../src/actions/modelActions';
import {ModelService} from '../src/utils/modelService';
import {resetCheckboxState} from '../src/actions/checkboxActions';
import {TestModel, userModelBruceInstance} from './testData/TestModel';
import {UserActions} from '../src/components/PagedList/BulkUserActions';
import {QueryFilter} from '../src/components/PagedList/Filters/QueryFilter';
import {DataGrid, IDataGridProps} from '../src/components/PagedList/DataGrid';
import {PagedListFilters} from '../src/components/PagedList/Filters/PagedListFilter';
import {PagedListImpl, PagedList, IPagedListProps} from '../src/components-stateful/PagedList';
import {
    IPagedListFiltersProps, 
    IBulkUserActionType, 
    IStoreInstanceType, 
    ICheckboxReducer
} from '../src/interfaces';
import '../src/init';

const FontAwesome: any = require<any>('react-fontawesome');
const unroll = require<any>('unroll');

unroll.use(it);

describe('Test cases for PagedList', (): void => {

    it('should throw an error when resource name is not passed', (): void => {
        expect((): void => {
            shallow<IPagedListProps, void>(
                <PagedListImpl 
                        max={10}
                        resource=""
                />
            );   
        }).toThrowError('No resource name passed.');
    });

    ModelService.register(TestModel);

    ModelService.getModel = jest.fn<any>((resource: string): typeof TestModel => {
        return TestModel;
    });

    TestModel.list = jest.fn((): TestModel[] => {
        return [];
    });
    
    let pagedList: ShallowWrapper<IPagedListProps, void> = shallow<IPagedListProps, void>(
        <PagedListImpl 
                max={10}
                resource="test"
        />
    );

    setPage = jest.fn((): {type: string} => {
        return {
            type: 'DUMMY'
        };
    });

    resetCheckboxState = jest.fn((): {type: string} => {
        return {
            type: 'DUMMY'
        };
    });

    store.dispatch = jest.fn();

    it('should call list method with max prop when component mounts', (): void => {
        expect(TestModel.list).toBeCalledWith({max: 10});
    });

    unroll('should render #componentName #count', (
        done: () => void, 
        args: {componentName: string, component: string | JSX.Element, count: number}
    ) => {
        expect(pagedList.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['componentName', 'component', 'count'],
        ['h2', 'h2', 1],
        ['Link', Link, 1],
        ['FontAwesome', FontAwesome, 1],
        ['QueryFilter', QueryFilter, 1],
        ['PagedListFilters', PagedListFilters, 1],
        ['DataGrid', DataGrid, 1],
        ['Pagination', Pagination, 1]
    ]);

    it('should not call list method when custom fetchInstanceList method is provided as prop', (): void => {
        let customFetchInstanceList: jest.Mock<void> = jest.fn<void>();
        TestModel.list.mockReset();

        shallow<IPagedListProps, void>(
                <PagedListImpl 
                        max={10}
                        resource="test"
                        fetchInstanceList={customFetchInstanceList}
                />
        );
        
        expect(TestModel.list).not.toBeCalled();
    });

    it('should render custom page header when pageHeader prop is passed', (): void => {
        expect(pagedList.find('h2').length).toBe(1);
        pagedList.setProps({pageHeader: <h1>This is my custom PageHeader.</h1>});
        
        expect(pagedList.find('h1').length).toBe(1);
        expect(pagedList.find('h2').length).toBe(0);
    });

    let customPagedListFilter: JSX.Element = (
        <PagedListFilters resource="test">
            <strong>Custom Filter</strong>
        </PagedListFilters>
    );

    class CustomPagedListFilter extends React.Component<IPagedListFiltersProps, void> {
        render(): JSX.Element {
            return (
                <h6>{this.props.resource}</h6>
            );
        }
    }

    let customDataGrid: JSX.Element = (
        <DataGrid 
                properties={null}
                instanceList={null}
        >
            <b>Custom DataGrid</b>
        </DataGrid>
    );

    class CustomDataGrid extends React.Component<IDataGridProps, void> {
        render(): JSX.Element {
            return (
                <h1>Custom DataGrid</h1>
            );
        }
    }

    let userActionsMap: IBulkUserActionType[] = [
        {label: 'Bark Now..!', action: (): void => {}},
        {label: 'Say Meow..!', action: (): void => {}}
    ];

    unroll('should render #componentName when passed as prop', (
        done: () => void, 
        args: {
            componentName: string, 
            prop: string, 
            propValue: JSX.Element | React.ComponentClass<any>, 
            searchComponent: string
        }
    ) => {
        expect(pagedList.find(args.searchComponent).length).toBe(0);
        pagedList.setProps({[args.prop]: args.propValue});
        expect(pagedList.find(args.searchComponent).length).toBe(1);
        done();
    }, [
        ['componentName', 'prop', 'propValue', 'searchComponent'],
        ['customPagedListFilter', 'pagedListFilters', customPagedListFilter, 'strong'],
        ['CustomPagedListFilter', 'pagedListFilters', CustomPagedListFilter, CustomPagedListFilter],
        ['UserActions', 'userActionsMap', userActionsMap, UserActions],
        ['customDataGrid', 'dataGrid', customDataGrid, 'b'],
        ['CustomDataGrid', 'dataGrid', CustomDataGrid, CustomDataGrid]
    ]);

    unroll('should call #methodName when page changes', (
        done: () => void, 
        args: {methodName: string, method: () => void, props: any, methodParam: number}
    ) => {
        TestModel.list.mockReset();
        setPage = jest.fn();

        expect(TestModel.list).not.toBeCalled();
        expect(setPage).not.toBeCalled();

        pagedList.setProps(args.props);
        pagedList.instance()[`handlePagination`](args.methodParam);

        expect(args.method).toBeCalled();
        done();
    }, [
        ['methodName', 'method', 'props', 'methodParam'],
        ['resetCheckboxState', resetCheckboxState, {resetCheckboxState: resetCheckboxState}, null],
        ['setPage', setPage, {activePage: 1, setPage: setPage}, 1]
    ]);
});

describe('Test cases for PagedList using mount', (): void => {
    
    let storeInstances: {testList?: IStoreInstanceType} = {};

    storeInstances[`testList`] = {
        instanceList: [userModelBruceInstance], 
        totalCount: 1, 
        activePage: 1,
        properties: userModelBruceInstance.properties
    };

    let checkbox: ICheckboxReducer = {selectedIds: [1], selectAllOnPage: false, selectAll: false};
    
    let pagedList: ReactWrapper<IPagedListProps, void> = mount<IPagedListProps, void> (
        <Provider store={configureStore({
            data: fromJS(storeInstances),
            checkbox: checkbox
        })}>
            <PagedList max={10} resource="test">
                <h1>
                    My PagedListFilter test using mount.
                </h1>
            </PagedList>
        </Provider>   
    );

    it('should unmount PagedList when unmount is called', (): void => {
        expect(pagedList.find('h2').length).toBe(1);
        pagedList.unmount();
        expect(pagedList.find('h2').length).toBe(0);
    }); 
});
