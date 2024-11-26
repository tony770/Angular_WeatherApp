import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
    console.log(`${this.apiUrl}/${location}/${date}?key=${this.key}`);
    return this.http.get<any>(`${this.apiUrl}/${location}/${date}?key=${this.key}`).pipe(
        catchError(this.handleError)
    )
  }

  private getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      //client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    }
    else {
      //server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
