export interface ATM {
  id: number;
  atmName: string;
  manufacturer: string;
  type: string;
  serialNumber: string;
  image?: string;
  createdAt?: Date;
}

export interface ATMState {
  atms: ATM[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}