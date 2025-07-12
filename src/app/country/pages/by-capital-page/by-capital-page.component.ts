import { Component, inject, resource, signal } from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent { 

  contryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request})=>{
      if(!this.query()) return of([]);

      return  this.contryService.searchByCapital(request.query);

    }
  });

  // countryResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async({request})=>{
  //     if(!this.query()) return [];

  //     return await firstValueFrom(this.contryService.searchByCapital(request.query));

  //   }
  // });

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string){

  //   if(this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.contryService.searchByCapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //     this.isLoading.set(false);
  //     this.countries.set(countries);
  //     },

  //     error: (err) =>{
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }

  //   });
  // }

}
