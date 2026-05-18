import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface StoredMessage extends ContactMessage {
  id: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly apiUrl = `${environment.apiUrl}/contact`;
  private readonly STORAGE_KEY = 'contact_messages';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  sendMessage(data: ContactMessage): Observable<unknown> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError((err: HttpErrorResponse) => {
        this.saveLocally(data);
        return throwError(() => err);
      })
    );
  }

  getMessages(): StoredMessage[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private saveLocally(data: ContactMessage): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const messages = this.getMessages();
    const stored: StoredMessage = {
      ...data,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    messages.unshift(stored);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
  }
}
