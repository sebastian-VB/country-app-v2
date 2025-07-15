import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  contryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParams);

  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request})=>{
      if(!this.query()) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query
        }
      })

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
