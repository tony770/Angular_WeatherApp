import { Component, OnInit, Renderer2, ElementRef, viewChild } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { CommonModule } from '@angular/common';
import { WeatherDisplayComponent } from '../weather-display/weather-display.component';
import { weatherData } from '../weatherdata.interface';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, WeatherDisplayComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  errorMessage: string = '';
  weatherData: weatherData = {} as weatherData;
  placeholderData: weatherData = {
    address: 'Tokyo',
    temp: 37,
    condition: 'windy',
    icon: 'icons/wind.png'
  }
  currentDegreeType: string = 'F';

  constructor(private weatherservice: WeatherService,
              private renderer: Renderer2
  ) {}

  ngOnInit(): void {
      this.weatherData = this.placeholderData;
  }

  searchWeather(location: string): void {
    this.weatherservice.getWeather(location).subscribe({
      next: (data) => {
        const weatherCondition = this.getFirstCondition(data.currentConditions.conditions);
        const address = this.getResolvedAddress(data.resolvedAddress);
        const newData: weatherData = {
          address: address,
          temp: data.currentConditions.temp,
          condition: weatherCondition,
          icon: 'icons/' + data.currentConditions.icon + '.png',
        }
        this.weatherData = newData;
        console.log(this.weatherData);
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  getFirstCondition(conditions: string) {
    return conditions.split(",").map(condition => condition.trim())[0];
  }

  getResolvedAddress(addresses: string) {
    return addresses.split(", ").slice(0, -1).join(", ");
  }

  switchDegreeType(button: HTMLElement): void {
    if(button.classList.contains('active')) {
      this.renderer.removeClass(button, 'active');
      this.renderer.addClass(button, 'nonactive');
    }
    else {
      this.renderer.removeClass(button, 'nonactive');
      this.renderer.addClass(button, 'active');
    }
  }
}
