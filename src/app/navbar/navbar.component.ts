import { Component } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  data: any;
  errorMessage: string = '';

  constructor(private weatherservice: WeatherService) {}

  ngOnInit(): void {
    
  }

  searchWeather(location: string): void {
    this.weatherservice.getWeather(location).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

}
