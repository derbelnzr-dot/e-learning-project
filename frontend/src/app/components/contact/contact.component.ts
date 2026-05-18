import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnDestroy {
  name = '';
  email = '';
  subject = '';
  message = '';

  submitting = false;
  submitted = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private contactService: ContactService) {}

  onSubmit(): void {
    if (this.submitting || !this.name || !this.email || !this.message) return;

    this.submitting = true;

    this.contactService.sendMessage({
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    }).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.showToastMessage('Your message has been sent successfully!', 'success');
        this.resetForm();
      },
      error: () => {
        this.submitting = false;
        this.showToastMessage('Something went wrong. Please try again later.', 'error');
      }
    });
  }

  sendAnother(): void {
    this.submitted = false;
  }

  private showToastMessage(message: string, type: 'success' | 'error'): void {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      this.toastTimeout = null;
    }, 3000);
  }

  closeToast(): void {
    this.showToast = false;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
      this.toastTimeout = null;
    }
  }

  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }

  ngOnDestroy(): void {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }
}
