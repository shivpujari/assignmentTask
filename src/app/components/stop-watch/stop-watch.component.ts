import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stop-watch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stop-watch.component.html',
  styleUrl: './stop-watch.component.scss'
})
export class StopWatchComponent {

  increaseCount: number = 0;
  clearInterval: any = ''
  formattedTime: any = ''

  ngOnInit() {
  }

  startWatch(): void {
    this.clearInterval = setInterval(() => {
      this.increaseCount++
    }, 1000);
  }

  stopWatch(): void {
    clearInterval(this.clearInterval)
  }

  resetWatch(): void {
    if (this.increaseCount) {
      this.increaseCount = 0
      clearInterval(this.clearInterval)
    }
  }
}
