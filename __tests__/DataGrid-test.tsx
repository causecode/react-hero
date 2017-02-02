jest.unmock('../src/components/PagedList/DataGrid');

import * as React from 'react';
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
});
