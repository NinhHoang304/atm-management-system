import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  @Input() title: string = 'Confirm deletion';
  @Input() message: string = 'Are you sure you want to delete it?';
  @Input() confirmText: string = 'Delete';
  @Input() cancelText: string = 'Cancel';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  isClosing = false;
  isSubmitting = false;

  onConfirm(): void {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    setTimeout(() => {
      this.isClosing = true;
      this.confirm.emit();
    }, 500);
  }

  onCancel(): void {
    if (this.isSubmitting) return;

    setTimeout(() => {
      this.isClosing = true;
      this.cancel.emit();
    }, 100);
  }
}