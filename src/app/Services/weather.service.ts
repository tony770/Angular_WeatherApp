import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = environment.apiUrl;
  private key = environment.apiKey;

  constructor(private http: HttpClient) { }

  getWeather(location: string): Observable<any> {
    const date = this.getCurrentDate();
    return this.http.get<any>(`${this.apiUrl}/${location}/${date}?key=${this.key}`)
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
}
