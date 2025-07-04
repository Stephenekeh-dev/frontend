import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   isDarkMode = signal(false);

  toggleTheme() {
    this.isDarkMode.update(val => !val);
  }

  // Apply dark-theme class to <body> tag
  constructor() {
    effect(() => {
      const dark = this.isDarkMode();
      document.body.classList.toggle('dark-theme', dark);
    });
  }
}
