import { Country } from "./types";

export function sortCountriesByPopulation(countries: Country[], order: "asc" | "desc") {
    return countries.sort((a, b) => {
        if (order === "asc") {
            return a.population - b.population;
        } else {
            return b.population - a.population;
        }
    });
}