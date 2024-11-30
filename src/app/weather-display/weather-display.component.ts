import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-display',
  imports: [],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent {
  @Input() address?: string;
  @Input() temp?: number;
  @Input() condition?: string;
}
