import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper{

    static mapRestContryToCountryInterface(country: RESTCountry): Country{
        return {
            cca2: country.cca2,
            shield: country.coatOfArms.svg,
            flagSvg: country.flags.svg,
            name: country.translations['spa'].common ?? '',
            capital: country.capital.join(','),
            population:country.population,

            region: country.region,
            subRegion: country.subregion
        };
    }

    static mapRestContryListToCountryListInterface(countries: RESTCountry[]): Country[]{
        return countries.map(this.mapRestContryToCountryInterface);
    }

}