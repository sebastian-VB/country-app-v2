import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {

  placeholderText = input<string>();
  debounceTime = input(300);
  initialValue = input<string>();

  value = output<string>();

  //linkedSignal: permite inicializar una señal con algun tipo de proceso, despues se puede trabajar como cualquier señal
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  onSearch(value: string) {
    this.value.emit(value);
  };

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() =>{
      clearTimeout(timeout);
    })

  })

}
