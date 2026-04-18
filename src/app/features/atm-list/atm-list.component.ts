import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ATMActions from '../../core/store/atm/atm.actions';
import * as ATMSelectors from '../../core/store/atm/atm.selectors';
import { ATM } from '../../models/atm.model';

@Component({
  selector: 'app-atm-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atm-list.component.html',
  styleUrls: ['./atm-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtmListComponent implements OnInit, OnDestroy {

  private store = inject(Store);

  atms$: Observable<ATM[]> = this.store.select(ATMSelectors.selectAllAtms);
  loading$: Observable<boolean> = this.store.select(ATMSelectors.selectAtmsLoading);
  error$: Observable<string | null> = this.store.select(ATMSelectors.selectAtmsError);
  lastUpdated$: Observable<Date | null> = this.store.select(ATMSelectors.selectLastUpdated);
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  private subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    // Load data when entering the page
    this.store.dispatch(ATMActions.loadAtms());

    // Track lastUpdated for pagination
    this.subscription.add(
      this.atms$.subscribe(atms => {
        this.totalPages = Math.ceil(atms.length / this.pageSize);
        if (this.currentPage > this.totalPages) {
          this.currentPage = 1;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshData(): void {
    this.store.dispatch(ATMActions.loadAtms());
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPagedAtms(atms: ATM[]): ATM[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return atms.slice(start, start + this.pageSize);
  }

  viewAtm(atm: ATM): void {
  }

  addNewAtm(): void {
  }

  editAtm(atm: ATM): void {
  }

  deleteAtm(atm: ATM): void {
  }

  trackByAtmId(index: number, atm: ATM): number | undefined {
    return atm?.id;
  }
}