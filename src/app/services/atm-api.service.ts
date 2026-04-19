import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ATM } from '../models/atm.model';

@Injectable({
  providedIn: 'root'
})
export class AtmApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ==================== GET ====================
  getAtms(): Observable<ATM[]> {
    return this.http.get<ATM[]>(this.apiUrl);
  }

  // ==================== ADD ====================
  addAtm(atm: Partial<ATM>): Observable<ATM> {
    return this.http.post<ATM>(this.apiUrl, atm);
  }

  // ==================== UPDATE ====================
  updateAtm(atm: ATM): Observable<ATM> {
    return this.http.put<ATM>(`${this.apiUrl}/${atm.id}`, atm);
  }

  // ==================== DELETE ====================
  deleteAtm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}