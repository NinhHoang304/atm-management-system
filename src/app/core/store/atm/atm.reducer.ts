import { createReducer, on } from '@ngrx/store';
import { initialATMState } from './atm.state';
import * as ATMActions from './atm.actions';

export const atmReducer = createReducer(
    initialATMState,

    on(ATMActions.loadAtms, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ATMActions.loadAtmsSuccess, (state, { atms }) => {
        return {
            ...state,
            atms,
            loading: false,
            error: null,
            lastUpdated: new Date()
        };
    }),

    on(ATMActions.loadAtmsFail, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error
        };
    }),

    on(ATMActions.refreshAtms, (state) => ({
        ...state,
        loading: true
    }))
);