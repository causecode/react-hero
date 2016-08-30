jest.unmock('../src/reducers/data');
import {
    FETCH_INSTANCE_LIST_START,
    FETCH_INSTANCE_LIST_FULFILLED,
    FETCH_INSTANCE_LIST_ERROR,
    TOGGLE_FILTERS,
    SET_PAGE
} from '../src/constants';
import {dataReducer} from '../src/reducers/data';
import {fromJS} from 'immutable';
import {resolver} from '../src/resolver';
import {BaseModel} from '../src/models/BaseModel';
import {ModelService} from '../src/utils/modelService';
import {MissingActionPayloadError} from '../src/errors/MissingActionPayloadError';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Data-dataReducer', () => {
    // fromJS({}) has 'any' as return type, therefore using 'Object' as type.
    const testJS: Object = fromJS({});
    const INITIAL_STATE: Object = fromJS({
        totalCount: 0,
        instanceList: [],
        properties: [],
        hasError: false,
        isLoading: false,
        filtersOpen: false,
    });
    let error: Object = fromJS({'hasError': true, 'isLoading': false});

    function actionData(type: string, payloadData?: string, page?: number, resource?: string) {
        return {
            type,
            resource,
            payload: { instanceList:
                [{data : payloadData}]
            },
            pageNumber: page
        };
    }

    let payloadString: string = 'test';
    let pageNo: number = 12;
    let resourceString: string = 'test_resource';
    let tempSuccess = dataReducer(
        INITIAL_STATE,
        actionData(FETCH_INSTANCE_LIST_FULFILLED, payloadString, pageNo, resourceString)
    );

    it('should return the initial value.', () => {
        expect(dataReducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    it('should handle start case.', () => {
        expect(dataReducer(INITIAL_STATE, actionData(FETCH_INSTANCE_LIST_START))).toEqual(INITIAL_STATE);
    });

    it('should handle error case ', () => {
        let tempError: {type: string, resource: string, payload: {instanceList: {data: string}[]}, pageNumber: number} =
                actionData(FETCH_INSTANCE_LIST_ERROR, payloadString, pageNo, resourceString);
        expect(dataReducer(INITIAL_STATE, tempError).get(`${resourceString}List`)).toBeTruthy();
        expect(dataReducer(INITIAL_STATE, tempError).get(`${resourceString}List`)).toEqual(error);
    });

    it('should handle set page.', () => {
        let tempSet = dataReducer(INITIAL_STATE, actionData(SET_PAGE, payloadString, pageNo, resourceString));
        expect(tempSet.get(`${resourceString}List`)).toBeTruthy();
        expect(tempSet.get(`${resourceString}List`).get('activePage')).toEqual(pageNo);
    });

    it('should handle toggle case', () => {
        let tempToggle = dataReducer(INITIAL_STATE, actionData(TOGGLE_FILTERS, payloadString, pageNo, resourceString));
        expect(tempToggle.get(`filtersOpen`)).toBeTruthy();
        expect(tempToggle.get(`filtersOpen`)).toEqual(true);
    });

    it('should handle success case', () => {
        expect(tempSuccess.get(`${resourceString}List`)).toBeTruthy();
    });

    unroll('success case should return #name', (done, testArgs) => {
        expect(tempSuccess.get(`${resourceString}List`).has(testArgs.name)).toBeTruthy();
        done();
    }, [
        ['name'],
        ['hasError'],
        ['instanceList'],
        ['isLoading'],
        ['properties'],
        ['totalCount']
    ]);

    it('should throw error when Payload is not provided.', () => {
        expect(() => dataReducer(INITIAL_STATE, {type: FETCH_INSTANCE_LIST_FULFILLED}))
                .toThrow(new MissingActionPayloadError());
    });
});
