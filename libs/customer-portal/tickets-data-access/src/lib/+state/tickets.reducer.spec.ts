/**
 * How to test NgRx Reducers:
 *
 * To test Reducers, we mock store state (or use `initialState`), import the reducerFunction
 * and then call the reducerFunction() with mock store state and specific action instances.
 *
 * This allows us to verify state changes for a specific action!
 *
 *  [Thomas Burleson, 9/8/2018]
 *
 */

import { ticketsReducer, initialState } from './tickets.reducer';

describe('Tickets Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any; // tslint:disable-line:no-any
      const state = ticketsReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });
});
