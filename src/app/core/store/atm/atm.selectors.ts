import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ATMState } from './atm.state';

export const selectAtmState = createFeatureSelector<ATMState>('atm');

export const selectAllAtms = createSelector(
    selectAtmState,
    state => state.atms
);

export const selectAtmsLoading = createSelector(
    selectAtmState,
    state => state.loading
);

export const selectAtmsError = createSelector(
    selectAtmState,
    state => state.error
);

export const selectLastUpdated = createSelector(
    selectAtmState,
    state => state.lastUpdated
);

export const selectAtmsCount = createSelector(
    selectAllAtms,
    atms => atms.length
);