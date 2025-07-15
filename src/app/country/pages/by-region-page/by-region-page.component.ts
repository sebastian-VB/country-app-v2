import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region{

  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    'africa' : 'Africa',
    'americas' : 'Americas',
    'asia' : 'Asia',
    'europe' : 'Europe',
    'oceania' : 'Oceania',
    'antarctic' : 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';

}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent { 

  countryService = inject(CountryService);
  
  activatedRoute = inject(ActivatedRoute); 
  router = inject(Router);
  
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region | null >(() => validateQueryParam(this.queryParams));

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    request: () => ({query: this.selectedRegion()}),
    loader: ({request})=>{
      if(!this.selectedRegion()) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.query
        }
      })

      return  this.countryService.searchByregion(request.query!);

    }
  });

}
