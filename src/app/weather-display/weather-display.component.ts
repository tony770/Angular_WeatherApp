import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-display',
  imports: [CommonModule],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.css'
})
export class WeatherDisplayComponent {
  @Input() address?: string;
  @Input() temp?: number;
  @Input() condition?: string;
  @Input() icon?: string;
}
