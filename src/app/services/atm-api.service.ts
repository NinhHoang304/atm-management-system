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

  constructor(private http: HttpClient) {}

  getAtms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAtm(atm: Partial<ATM>): Observable<any> {
    return this.http.post(this.apiUrl, atm);
  }

}