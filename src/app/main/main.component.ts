import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  data: any;

  constructor(private weatherservice: WeatherService) {}

  ngOnInit(): void {
    
  }

  searchWeather(location: string): void {
    this.weatherservice.getWeather(location).subscribe((data) => {
      this.data = data;
    });
  }
}
