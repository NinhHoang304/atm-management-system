import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ATMActions from '../../core/store/atm/atm.actions';
import { ATM } from '../../models/atm.model';

@Component({
  selector: 'app-atm-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './atm-form.component.html',
  styleUrls: ['./atm-form.component.scss']
})
export class AtmFormComponent implements OnInit {
  @Input() isEditMode: boolean = false;
  @Input() atmToEdit: ATM | null = null;
  @Output() close = new EventEmitter<void>();

  private store = inject(Store);
  private fb = inject(FormBuilder);

  form: FormGroup;
  currentAtmId: number | null = null;
  imagePreview: string | null = null;
  isClosing = false;
  isSubmitting = false;

  constructor() {
    this.form = this.fb.group({
      atmName: ['', Validators.required],
      manufacturer: ['', Validators.required],
      type: ['', Validators.required],
      serialNumber: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    if (this.atmToEdit) {
      this.isEditMode = true;
      this.currentAtmId = this.atmToEdit.id;
      this.form.patchValue({
        atmName: this.atmToEdit.atmName,
        manufacturer: this.atmToEdit.manufacturer,
        type: this.atmToEdit.type,
        serialNumber: this.atmToEdit.serialNumber,
      });
      this.imagePreview = this.atmToEdit.image || null;
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.form.patchValue({ image: this.imagePreview });
      };
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    if (this.form.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    
    const formValue = this.form.value;
    
    const atmData: ATM = {
      id: this.isEditMode && this.currentAtmId ? this.currentAtmId : Date.now(),
      atmName: formValue.atmName,
      manufacturer: formValue.manufacturer,
      type: formValue.type,
      serialNumber: formValue.serialNumber,
      image: this.imagePreview || '',
      createdAt: new Date()
    };

    if (this.isEditMode) {
      this.store.dispatch(ATMActions.updateAtm({ atm: atmData }));
    } else {
      this.store.dispatch(ATMActions.addAtm({ atm: atmData }));
    }

    setTimeout(() => {
      this.isSubmitting = false;
      this.isClosing = true;
      this.close.emit();
    }, 500);
  }

  onCancel(): void {
    this.isClosing = true;

    setTimeout(() => {
      this.form.reset();
      this.imagePreview = null;
      this.isEditMode = false;
      this.currentAtmId = null;
      this.isSubmitting = false;
      this.close.emit();
    }, 500);
  }
}