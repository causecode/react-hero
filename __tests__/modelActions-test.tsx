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
    SAVE_ALL_INSTANCES,
    TOGGLE_SECONDARY_NAV,
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
            pageNumber,
        };
    }

    function expectedValueForSavingAllInstances(type: string, resource?: string, instanceList?: IInstanceList[]) {
        return {
            type,
            resource,
            instanceList,
        };
    }

    unroll('It should create an action to #title', (
        done: () => void,
        args: {
            title: string,
            action: {type: string},
            expectedParams: (string | number)[],
        }
    ): void => {
        expect(args.action).toEqual(expectedValue(...args.expectedParams));
        done();
    }, [
        ['title', 'action', 'expectedParams'],
        ['set list', Actions.setPage(testPageNumber, testResource), [SET_PAGE, testResource, testPageNumber]],
        ['unset list', Actions.unsetList(testResource), [UNSET_RESOURCE_LIST, testResource]],
        ['toggle filters', Actions.toggleFilters(), [TOGGLE_FILTERS]],
        ['toggle primary navigation', Actions.toggleNav(), [TOGGLE_NAV]],
        ['toggle secondary navigation', Actions.toggleSecondaryNav(), [TOGGLE_SECONDARY_NAV]],
    ]);

    unroll('It should create an action to #operation an instance', (
        done: () => void,
        args: {
            operation: string,
            actionName: string,
            actionType: string,
        }
    ): void => {
        const action: {instance: BaseModel, type: string} = Actions[args.actionName](instances[resource]);
        expect(action.instance).toEqual(instances[resource]);
        expect(action.type).toEqual(args.actionType);
        done();
    }, [
        ['operation', 'actionName', 'actionType'],
        ['save', 'saveInstance', SAVE_INSTANCE],
        ['update', 'updateInstance', UPDATE_INSTANCE],
        ['delete', 'deleteInstance', DELETE_INSTANCE],
    ]);

    it('should create an action to save all the instances', () => {
        expect(Actions.saveAllInstances(testInstanceList, testResource))
                .toEqual(expectedValueForSavingAllInstances(SAVE_ALL_INSTANCES, testResource, testInstanceList));
    });
});
