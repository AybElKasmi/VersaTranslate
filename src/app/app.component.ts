import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationComponent } from './components/translation/translation.component';
// import { MoreDropdownComponent } from './components/more-dropdown/more-dropdown.component'; // Import


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslationComponent],
  template: `<app-translation></app-translation>`,
})
export class AppComponent {}
