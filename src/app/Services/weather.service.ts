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
    const apiCall = `${this.apiUrl}/${location}/${date}?key=${this.key}&include=current`;
    console.log(apiCall);
    return this.http.get<any>(apiCall).pipe(
        catchError(this.handleError)
    )
  }

  private getCurrentDate(): string {
    const today = new Date();
    return today.toISOString();
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
