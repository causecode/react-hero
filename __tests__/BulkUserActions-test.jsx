"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
jest.unmock('../src/components/paged-list/BulkUserActions');
var React = require("react");
var enzyme_1 = require("enzyme");
var react_redux_1 = require("react-redux");
var store_1 = require("../src/store");
var store_2 = require("../src/store");
var BulkUserActions_1 = require("../src/components/paged-list/BulkUserActions");
var unroll = require('unroll');
unroll.use(it);
describe('Tests for BulkUserActions', function () {
    var saveUser = jest.fn();
    var deleteUser = jest.fn();
    var checkboxReducer = { selectedIds: [1], selectAllOnPage: false, selectAll: false };
    var bulkUserActionReducer = { action: 'Save User' };
    var userActionsMap = [
        { label: 'Save User', action: saveUser },
        { label: 'Delete User', action: deleteUser }
    ];
    var bulkUserActionsComponent = enzyme_1.mount(<react_redux_1.Provider store={store_2.configureStore({
        checkbox: checkboxReducer,
        userAction: bulkUserActionReducer
    })}>
            <BulkUserActions_1.UserActions isDisabled={false} userActionsMap={userActionsMap}/>
        </react_redux_1.Provider>);
    unroll('should render #count #component elements', function (done, args) {
        expect(bulkUserActionsComponent.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        ['select', 1],
        ['option', 3],
        ['Button', 1]
    ]);
    unroll('should render correct label for #action', function (done, args) {
        expect(bulkUserActionsComponent.find('select').childAt(args.index).text()).toEqual(args.label);
        done();
    }, [
        ['action', 'label', 'index'],
        ['--User Action--', '--User Action--', 0],
        ['saveUser', 'Save User', 1],
        ['deleteUser', 'Delete User', 2]
    ]);
    store_1.store.dispatch = jest.fn();
    it('should dispatch saveUserAction when option is changed', function () {
        expect(store_1.store.dispatch).not.toBeCalled();
        bulkUserActionsComponent.find('select').simulate('change', { target: { value: 'saveUser' } });
        expect(store_1.store.dispatch).toBeCalledWith({ 'type': 'SAVE_USER_ACTION', 'payload': 'saveUser' });
    });
    it('should call performAction when the Go button is clicked', function () {
        bulkUserActionsComponent.find('Button').simulate('click');
        expect(store_1.store.dispatch).toBeCalledWith({ 'type': 'SAVE_USER_ACTION_DATA', 'payload': 1 });
        expect(saveUser).toBeCalled();
    });
});
