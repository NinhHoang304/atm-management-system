import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastData {
    message: string;
    type: 'success' | 'error' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private toastSubject = new BehaviorSubject<ToastData | null>(null);
    toast$ = this.toastSubject.asObservable();

    show(message: string, type: ToastData['type'] = 'success') {
        this.toastSubject.next({ message, type });

        setTimeout(() => {
            this.toastSubject.next(null);
        }, 1500);
    }
}