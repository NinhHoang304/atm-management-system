import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { interval, of } from 'rxjs';
import { inject } from '@angular/core';
import * as ATMActions from './atm.actions';
import { AtmApiService } from '../../../services/atm-api.service';
import { ATM } from '../../../models/atm.model';
import { ToastService } from '../../../services/toast.service';

@Injectable()
export class AtmEffects {

    private actions$ = inject(Actions);
    private atmService = inject(AtmApiService);
    private toast = inject(ToastService);

    // Load ATMs
    loadAtms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ATMActions.loadAtms),
            mergeMap(() =>
                this.atmService.getAtms().pipe(
                    delay(500),
                    map((data) => {
                        const atms: ATM[] = data.slice(0, 50).map((item: any, index: number) => ({
                            id: item.id,
                            atmName: `ATM ${String(index + 1).padStart(3, '0')}`,
                            manufacturer: ['Glory', 'Diebold', 'NCR', 'Wincor Nixdorf'][Math.floor(Math.random() * 4)],
                            type: ['Automated Teller Machine', 'Automated Deposit Machine', 'Multi-functional ATM'][Math.floor(Math.random() * 3)],
                            serialNumber: 'SN' + Math.random().toString().slice(2, 12),
                            image: [
                                'https://t4.ftcdn.net/jpg/15/57/24/59/360_F_1557245947_bkhojD4pwtemRuGCGmcBjPOpzEZgsnXs.jpg',
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSClFkDdLIQsrJZQGHZvBPJlW0zHskB-0rVPQ&s',
                                'https://img.pikbest.com/png-images/20250519/gray-atm-machine-with-white-sign_11718017.png!w700wp',
                                'https://img.freepik.com/premium-photo/bank-atm-machine-with-blue-screen-that-says-atm-it_1281604-4607.jpg?semt=ais_hybrid&w=740&q=80',
                                'https://thumbs.dreamstime.com/z/24-hour-atm-13645502.jpg'
                            ][Math.floor(Math.random() * 5)]
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
        this.actions$.pipe(
            ofType(ATMActions.loadAtmsSuccess),
            switchMap(() =>
                interval(120000).pipe(
                    map(() => ATMActions.loadAtms()),
                    takeUntil(this.actions$.pipe(ofType(ATMActions.loadAtms)))
                )
            )
        )
    );

    // Add ATM
    addAtm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ATMActions.addAtm),
            mergeMap(({ atm }) =>
                this.atmService.addAtm(atm).pipe(
                    tap(() => this.toast.show('Add ATM successfully')),
                    map((newAtm: ATM) => ATMActions.addAtmSuccess({ atm: newAtm })),
                    catchError(err => of(ATMActions.addAtmFail({ error: err.message })))
                )
            )
        )
    );

    // Update ATM
    updateAtm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ATMActions.updateAtm),
            tap(() => this.toast.show('Update ATM successfully', 'success')),
            map(({ atm }) => ATMActions.updateAtmSuccess({ atm }))
        )
    );

    // Delete ATM
    deleteAtm$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ATMActions.deleteAtm),
            tap(() => this.toast.show('Delete ATM successfully', 'success')),
            map(({ id }) => ATMActions.deleteAtmSuccess({ id }))
        )
    );
}