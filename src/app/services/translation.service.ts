import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Ensure it's provided at the root level
})
export class TranslationService {
  // private apiUrl = 'https://api.elkasmi.space/api/translation';  // Your Laravel API URL
  private apiUrl = 'http://127.0.0.1:8000/api/translation';  // Your Laravel API URL


  constructor(private http: HttpClient) {} // Inject HttpClient

  getTranslations(prefix: string, search: string): Observable<any[]> {
    const params = new HttpParams().set('prefix', prefix).set('search', search);
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getTransalationPrefix(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/prefix`);
  }

  addKey(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  deleteTranslation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addPrefix(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prefix`, data);
  }

  addLang(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/lang`, {'data': data});
  }

  updateTranslation(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update`, data);
  }
}
