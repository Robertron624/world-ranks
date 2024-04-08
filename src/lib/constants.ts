export const countriesBaseUrl = "https://restcountries.com/v3.1/all";

interface SortingOption {
    value: string;
    label: string;
}

export const sortingOptions: SortingOption[] = [
    { value: "population", label: "Population" },
    { value: "name", label: "Name" },
    { value: "area", label: "Area" },
];

export const filterRegions: SortingOption[] = [
    { value: "africa", label: "Africa" },
    { value: "antartica", label: "Antarctica"},
    { value: "americas", label: "Americas" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "oceania", label: "Oceania" },
];

export const countryStatus = [
    { value: "member-of-un", label: "Member of the United Nations" },
    { value: "independent", label: "Independent" },
];