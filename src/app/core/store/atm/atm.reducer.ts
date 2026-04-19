import { createReducer, on } from '@ngrx/store';
import { initialATMState } from './atm.state';
import * as ATMActions from './atm.actions';

export const atmReducer = createReducer(
    initialATMState,

    // ==================== LOAD ====================

    on(ATMActions.loadAtms, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ATMActions.loadAtmsSuccess, (state, { atms }) => ({
        ...state,
        atms,
        loading: false,
        error: null,
        lastUpdated: new Date()
    })),

    on(ATMActions.loadAtmsFail, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // ==================== ADD ====================

    on(ATMActions.addAtmSuccess, (state, { atm }) => ({
        ...state,
        atms: [...state.atms, atm]
    })),

    on(ATMActions.addAtmFail, (state, { error }) => ({
        ...state,
        error
    })),

    // ==================== UPDATE ====================

    on(ATMActions.updateAtmSuccess, (state, { atm }) => ({
        ...state,
        atms: state.atms.map(item =>
            item.id === atm.id ? atm : item
        )
    })),

    on(ATMActions.updateAtmFail, (state, { error }) => ({
        ...state,
        error
    })),

    // ==================== DELETE ====================

    on(ATMActions.deleteAtmSuccess, (state, { id }) => ({
        ...state,
        atms: state.atms.filter(item => item.id !== id)
    })),

    on(ATMActions.deleteAtmFail, (state, { error }) => ({
        ...state,
        error
    }))
);