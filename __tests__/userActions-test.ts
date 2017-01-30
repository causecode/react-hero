jest.unmock('../src/actions/userActions');

import * as actions from '../src/actions/userActions';
const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Tests for userActions.', () => {
    
   unroll('should create #action action', (done, args) => {
        expect(actions[args.action](args.payload)).toEqual({type: args.type, payload: args.payload});
        done();
    }, [
        ['action', 'type', 'payload'],
        ['saveUserAction', 'SAVE_USER_ACTION', 'Export Report'],
        ['saveUserActionData', 'SAVE_USER_ACTION_DATA', 20]
    ]);

    it('should create resetUserAction action', () => {
        expect(actions.resetUserAction()).toEqual({type: 'RESET_USER_ACTION'});
    });
});
