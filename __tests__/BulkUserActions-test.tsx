jest.unmock('../src/components/paged-list/BulkUserActions');

import * as React from 'react';
import {ReactWrapper, mount} from 'enzyme';
import {Provider} from 'react-redux';
import {store} from '../src/store';
import {ICheckboxReducer, IBulkUserActionType} from '../src/interfaces';
import {configureStore} from '../src/store';
import {UserActions, IUserActionProps} from '../src/components/paged-list/BulkUserActions';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for BulkUserActions', () => {

    let saveUser: jest.Mock<void> = jest.fn<void>();
    let deleteUser: jest.Mock<void> = jest.fn<void>();

    let checkboxReducer: ICheckboxReducer = {selectedIds: [1], selectAllOnPage: false, selectAll: false};
    let bulkUserActionReducer: {action: string} = {action: 'Save User'};
    let userActionsMap: IBulkUserActionType[] = [
        {label: 'Save User', action: saveUser},
        {label: 'Delete User', action: deleteUser}
    ];
    const bulkUserActionsComponent: ReactWrapper<IUserActionProps, void> = mount <IUserActionProps, void> (
        <Provider store={configureStore ({
            checkbox: checkboxReducer,
            userAction: bulkUserActionReducer
         })}>
            <UserActions isDisabled={false} userActionsMap={userActionsMap} />
        </Provider>
    );

    unroll('should render #count #component elements', (done, args) => {
        expect(bulkUserActionsComponent.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['select', 1],
        ['option', 3],
        ['Button', 1]
    ]);

    unroll('should render correct label for #action', (done, args) => {
        expect(bulkUserActionsComponent.find('select').childAt(args.index).text()).toEqual(args.label); 
        done();
    }, [
        ['action', 'label', 'index'],
        ['--User Action--', '--User Action--', 0],
        ['saveUser', 'Save User', 1],
        ['deleteUser', 'Delete User', 2]
    ]);
    
    store.dispatch = jest.fn();
    it('should dispatch saveUserAction when option is changed', () => {
        expect(store.dispatch).not.toBeCalled();
        bulkUserActionsComponent.find('select').simulate('change', {target: {value: 'saveUser'}});
        expect(store.dispatch).toBeCalledWith({'type': 'SAVE_USER_ACTION', 'payload': 'saveUser'});
    });
 
    it('should call performAction when the Go button is clicked', () => {
        bulkUserActionsComponent.find('Button').simulate('click');
        expect(store.dispatch).toBeCalledWith({'type': 'SAVE_USER_ACTION_DATA', 'payload': 1});
        expect(saveUser).toBeCalled();
    });
});
