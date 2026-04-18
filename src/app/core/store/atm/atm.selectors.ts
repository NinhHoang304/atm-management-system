import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ATMState } from './atm.state';

export const selectATMState = createFeatureSelector<ATMState>('atm');

export const selectAllAtms = createSelector(
    selectATMState,
    (state: ATMState) => state.atms
);

export const selectAtmsLoading = createSelector(
    selectATMState,
    (state: ATMState) => state.loading
);

export const selectAtmsError = createSelector(
    selectATMState,
    (state: ATMState) => state.error
);

export const selectLastUpdated = createSelector(
    selectATMState,
    (state: ATMState) => state.lastUpdated
);

export const selectAtmsCount = createSelector(
    selectAllAtms,
    (atms) => atms.length
);