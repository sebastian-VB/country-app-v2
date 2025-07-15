import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheCountryByRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]>{

    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(resp => CountryMapper.mapRestContryListToCountryListInterface(resp) ),
      tap(countries => this.queryCacheCapital.set(query, countries)),
      catchError(error => {
        console.log('Error fetching', error);

        return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
      })
    ); 

  }

  searchByCountry(query: string): Observable<Country[]>{

    query = query.toLowerCase();

    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(resp => CountryMapper.mapRestContryListToCountryListInterface(resp) ),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError(error => {
        console.log('Error fetching', error);

        return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
      })
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined>{

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(resp => CountryMapper.mapRestContryListToCountryListInterface(resp) ),
      map((countries) => countries.at(0)),
      delay(2000),
      catchError(error => {
        console.log('Error fetching', error);

        return throwError(()=> new Error(`No se pudo obtener paises con ese codigo ${code}`));
      })
    );
  }

  searchByregion(region: Region): Observable<Country[] | undefined>{

    if(this.queryCacheCountryByRegion.has(region)){
      return of(this.queryCacheCountryByRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map(resp => CountryMapper.mapRestContryListToCountryListInterface(resp) ),
      tap(countries => this.queryCacheCountryByRegion.set(region, countries)),
      catchError(error => {
        console.log('Error fetching', error);

        return throwError(()=> new Error(`No se pudo obtener paises con esta region ${region}`));
      })
    );
  }

}
