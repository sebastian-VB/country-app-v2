import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  contryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request})=>{
      if(!this.query()) return of([]);

      return  this.contryService.searchByCountry(request.query);

    }
  });

  // countryResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async({request})=>{
  //     if(!this.query()) return [];

  //     return await firstValueFrom(this.contryService.searchByCountry(request.query));

  //   }
  // });
}
