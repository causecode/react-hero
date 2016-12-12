jest.unmock('../src/actions/modelActions');

import * as Actions from '../src/actions/modelActions';
import {initializeTestCase} from './../src/utils/initializeTestCase';
import {IInitializerData} from './../src/utils/initializeTestCase';
import {BaseModel} from '../src/models/BaseModel';
import {
    SAVE_INSTANCE,
    UPDATE_INSTANCE,
    DELETE_INSTANCE,
    SET_PAGE,
    TOGGLE_FILTERS,
    TOGGLE_NAV,
    UNSET_RESOURCE_LIST,
    SAVE_ALL_INSTANCES
} from '../src/constants';

const unroll: any = require<any>('unroll');

unroll.use(it);

export interface IInstanceList {
    id: number;
    title: string;
}
describe('instanceActions', () => {
    let { resource, instances }: IInitializerData = initializeTestCase();
    let testResource: string = 'test';
    let testPageNumber: number = 12;
    let testInstanceList: IInstanceList[] = [
        {id: 1, title: 'xyz'},
        {id: 2, title: 'abc'}
    ];

    function expectedValue(type: string, resource?: string, pageNumber?: number) {
        return {
            type,
            resource,
            pageNumber
        };
    }

    function expectedValueForSavingAllInstances(type: string, resource?: string, instanceList?: IInstanceList[]) {
        return {
            type,
            resource,
            instanceList
        };
    }

    it('should create an action to set list', () => {
        expect(Actions.setPage(testPageNumber, testResource))
                .toEqual(expectedValue(SET_PAGE, testResource, testPageNumber));
    });

    it('should create an action to unset list', () => {
        expect(Actions.unsetList(testResource))
                .toEqual(expectedValue(UNSET_RESOURCE_LIST, testResource));
    });

    it('should create an action to toggle filters', () => {
        expect(Actions.toggleFilters())
                .toEqual(expectedValue(TOGGLE_FILTERS));
    });

    it('should create an action to toggle navigation', () => {
        expect(Actions.toggleNav())
                .toEqual(expectedValue(TOGGLE_NAV));
    });

    it('should create an action to save all the instances', () => {
        expect(Actions.saveAllInstances(testInstanceList, testResource))
                .toEqual(expectedValueForSavingAllInstances(SAVE_ALL_INSTANCES, testResource, testInstanceList));
    });

    it('should create an action for Save Update and Delete instance', () => {
        let ModelActionFactory = jest.fn();
        Actions.saveInstance(instances[resource]);
        Actions.updateInstance(instances[resource]);
        Actions.deleteInstance(instances[resource]);
        expect(ModelActionFactory).toBeCalled();
    });
});
