import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent { 

  contryService = inject(CountryService);
  
  activatedRoute = inject(ActivatedRoute);  
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request})=>{
      if(!this.query()) return of([]);

      //se agrega el valor del input text a la ruta con los queryparams
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      });

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
