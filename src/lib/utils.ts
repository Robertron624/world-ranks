import { Country, RegionOption, CountryStatusOption, orderType } from "./types";
import { sortingOptions } from "./constants";

export function sortCountriesByPopulation(countries: Country[], order: orderType) {
    return countries.sort((a, b) => {
        if (order === "asc") {
            return a.population - b.population;
        } else {
            return b.population - a.population;
        }
    });
}

function sortCountriesByName(countries: Country[], order: orderType) {
    return countries.sort((a, b) => {
        if (order === "asc") {
            return a.name.common.localeCompare(b.name.common);
        } else {
            return b.name.common.localeCompare(a.name.common);
        }
    });
}

export function sortCountriesByArea(countries: Country[], order: orderType) {
    return countries.sort((a, b) => {
        if (order === "asc") {
            return a.area - b.area;
        } else {
            return b.area - a.area;
        }
    });
}

export function formatCountryNumbers(population: number) {
    const formatter = new Intl.NumberFormat("en-US");

    return formatter.format(population);
}

export function sortCountriesBy (sortingOption:string, countries: Country[]) {
    
    let sortedCountries;

    const splitted = sortingOption.split('-');
    const sortByOption = splitted[0];
    const order = splitted[1] as orderType;

    switch (sortByOption) {
        case 'population': {
            sortedCountries = sortCountriesByPopulation(countries, order);
            break;
        }
        case 'name': {
            sortedCountries = sortCountriesByName(countries, order);
            break;
        }
        case 'area': {
            sortedCountries = sortCountriesByArea(countries, order);
            break;
        }
        default: {
            sortedCountries = countries;
            break;
        }
        
    }

    return sortedCountries;
}

export function filterCountriesByRegion(countries: Country[], region: RegionOption[]) {
    const filteredCountries: Country[] = [];

    if(region.length === 0) return countries;

    for(let i = 0; i < region.length; i++) {
        const regionCountries = countries.filter((country) => country.region.toLowerCase() === region[i]);
        filteredCountries.push(...regionCountries);
    }

    return filteredCountries;
}

export function filterCountriesByStatus(countries: Country[], status: CountryStatusOption[]) {
    let filteredCountries: Country[] = [];

    if(status.length === 0) return countries;

    for(let i = 0; i < status.length; i++) {
        const currentStatus = status[i];

        switch(currentStatus) {
            case 'independent': {
                filteredCountries = countries.filter((country) => country.independent);
                break;
            }
            case 'un-member': {
                filteredCountries = countries.filter((country) => country.unMember);
                break;
            }
            default: {
                filteredCountries = countries;
                break;
            }
        
        }
    }
    
    return filteredCountries;
}

export function searchCountriesByName(countries: Country[], searchTerm: string) {
    return countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()));
}

export function searchCountriesByRegion(countries: Country[], searchTerm: string) {
    return countries.filter((country) => country.region.toLowerCase().includes(searchTerm.toLowerCase()));
}

export function searchCountriesBySubregion(countries: Country[], searchTerm: string) {
    return countries.filter((country) => country.subregion?.toLowerCase().includes(searchTerm.toLowerCase()));
}