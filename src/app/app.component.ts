import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MockComponent } from './components/mock/mock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MockComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  receivedData: string = ''

  reveiveData(data: any): void {
    this.receivedData = data
  }
}
