import { ATM } from '../../../models/atm.model';

export interface ATMState {
  atms: ATM[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const initialATMState: ATMState = {
  atms: [],
  loading: false,
  error: null,
  lastUpdated: null
};