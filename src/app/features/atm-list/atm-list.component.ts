import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ATMActions from '../../core/store/atm/atm.actions';
import * as ATMSelectors from '../../core/store/atm/atm.selectors';
import { ATM } from '../../models/atm.model';
import { AtmFormComponent } from '../atm-form/atm-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AtmViewComponent } from '../atm-view/atm-view.component';

@Component({
  selector: 'app-atm-list',
  standalone: true,
  imports: [CommonModule, AtmFormComponent, ConfirmDialogComponent, AtmViewComponent],
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
  pages: number[] = [];

  // Modal add/edit control
  showFormModal = false;
  selectedAtmForEdit: ATM | null = null;

  // Modal delete control
  showConfirmDialog = false;
  atmToDelete: ATM | null = null;

  //Modal view
  selectedAtmForView: ATM | null = null;

  get deleteConfirmMessage(): string {
    return `Are you sure you want to delete ATM "${this.atmToDelete?.atmName || ''}"?`;
  }

  private subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    // Load data
    this.store.dispatch(ATMActions.loadAtms());

    // Pagination
    this.subscription.add(
      this.atms$.subscribe(atms => {
        this.totalPages = Math.ceil(atms.length / this.pageSize) || 1;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

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
    this.selectedAtmForView = atm;
  }

  closeViewModal(): void {
    this.selectedAtmForView = null;
  }

  addNewAtm(): void {
    this.selectedAtmForEdit = null;
    this.showFormModal = true;
  }

  editAtm(atm: ATM): void {
    this.selectedAtmForEdit = atm;
    this.showFormModal = true;
  }

  closeFormModal(): void {
    this.showFormModal = false;
    this.selectedAtmForEdit = null;
  }

  confirmDelete(atm: ATM): void {
    this.atmToDelete = atm;
    this.showConfirmDialog = true;
  }

  executeDelete(): void {
    if (this.atmToDelete?.id) {
      this.store.dispatch(ATMActions.deleteAtm({ id: this.atmToDelete.id }));
    }
    this.closeConfirmDialog();
  }

  closeConfirmDialog(): void {
    this.showConfirmDialog = false;
    this.atmToDelete = null;
  }

  trackByAtmId(index: number, atm: ATM): number | undefined {
    return atm?.id;
  }
}