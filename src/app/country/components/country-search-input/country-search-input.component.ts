import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  placeholderText = input<string>();
  valueInput = output<string>();

  onSearch(value: string) {
    this.valueInput.emit(value);
  }

}
