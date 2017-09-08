/**
 * Created by jean.h.ma on 24/07/2017.
 */
import {ActionType} from '../types'
import guid from 'guid'
import update from 'immutability-helper'

const initialState: Object = {
	token: null
};

export default function (state: Object = initialState, action: ActionType = {}): Object {
	switch (action.type) {
		default:
			return state;
	}
}
