import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { interval, of } from 'rxjs';
import { inject } from '@angular/core';
import * as ATMActions from './atm.actions';
import { AtmApiService } from '../../../services/atm-api.service';
import { ATM } from '../../../models/atm.model';

@Injectable()
export class AtmEffects {

    private actions$ = inject(Actions);
    private atmService = inject(AtmApiService);

    // Load ATMs
    loadAtms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ATMActions.loadAtms),
            mergeMap(() =>
                this.atmService.getAtms().pipe(
                    map((data) => {
                        const atms: ATM[] = data.slice(0, 50).map((item: any, index: number) => ({
                            id: item.id,
                            atmName: `ATM ${String(index + 1).padStart(3, '0')}`,
                            manufacturer: ['Glory', 'Diebold', 'NCR', 'Wincor Nixdorf'][Math.floor(Math.random() * 4)],
                            type: ['Automated Teller Machine', 'Automated Deposit Machine', 'Multi-functional ATM'][Math.floor(Math.random() * 3)],
                            serialNumber: 'SN' + Math.random().toString().slice(2, 12),
                            image: item.thumbnailUrl || item.url
                        }));

                        return ATMActions.loadAtmsSuccess({ atms });
                    }),
                    catchError((error) => {
                        return of(ATMActions.loadAtmsFail({ error: error.message }));
                    })
                )
            )
        )
    );

    // Auto Refresh every 2 minutes
    autoRefresh$ = createEffect(() =>
        interval(120000).pipe(
            startWith(0),
            switchMap(() => of(ATMActions.loadAtms()))
        )
    );
}