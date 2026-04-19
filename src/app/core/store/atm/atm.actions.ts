import { createAction, props } from '@ngrx/store';
import { ATM } from '../../../models/atm.model';

// ==================== LOAD ====================

export const loadAtms = createAction('[ATM] Load ATMs');

export const loadAtmsSuccess = createAction(
  '[ATM] Load ATMs Success',
  props<{ atms: ATM[] }>()
);

export const loadAtmsFail = createAction(
  '[ATM] Load ATMs Fail',
  props<{ error: string }>()
);

export const refreshAtms = createAction('[ATM] Refresh ATMs');

// ==================== ADD ====================

export const addAtm = createAction(
  '[ATM] Add ATM',
  props<{ atm: Partial<ATM> }>()
);

export const addAtmSuccess = createAction(
  '[ATM] Add ATM Success',
  props<{ atm: ATM }>()
);

export const addAtmFail = createAction(
  '[ATM] Add ATM Fail',
  props<{ error: string }>()
);

// ==================== UPDATE ====================

export const updateAtm = createAction(
  '[ATM] Update ATM',
  props<{ atm: ATM }>()
);

export const updateAtmSuccess = createAction(
  '[ATM] Update ATM Success',
  props<{ atm: ATM }>()
);

export const updateAtmFail = createAction(
  '[ATM] Update ATM Fail',
  props<{ error: string }>()
);

// ==================== DELETE ====================

export const deleteAtm = createAction(
  '[ATM] Delete ATM',
  props<{ id: number }>()
);

export const deleteAtmSuccess = createAction(
  '[ATM] Delete ATM Success',
  props<{ id: number }>()
);

export const deleteAtmFail = createAction(
  '[ATM] Delete ATM Fail',
  props<{ error: string }>()
);