import { createAction, props } from '@ngrx/store';
import { ATM } from '../../../models/atm.model';

export const loadAtms = createAction('[ATM] Load ATMs');

export const loadAtmsSuccess = createAction(
  '[ATM] Load ATMs Success',
  props<{ atms: ATM[] }>()
);

export const loadAtmsFail = createAction(
  '[ATM] Load ATMs Fail',
  props<{ error: string }>()
);

export const addAtm = createAction(
  '[ATM] Add ATM',
  props<{ atm: Partial<ATM> }>()
);

export const refreshAtms = createAction('[ATM] Refresh ATMs');