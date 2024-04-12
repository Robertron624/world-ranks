export const countriesBaseUrl = "https://restcountries.com/v3.1";

interface SortingOption {
    value: string;
    label: string;
}

export const sortingOptions: SortingOption[] = [
    { value: "population-desc", label: "Population (High to Low)" },
    { value: "population-asc", label: "Population (Low to High)" },
    { value: "name-desc", label: "Name (Z to A)" },
    { value: "name-asc", label: "Name (A to Z)" },
    { value: "area-desc", label: "Area (High to Low)" },
    { value: "area-asc", label: "Area (Low to High)" },
];

export const filterRegions: SortingOption[] = [
    { value: "africa", label: "Africa" },
    { value: "antarctic", label: "Antarctica"},
    { value: "americas", label: "Americas" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "oceania", label: "Oceania" },
];

export const countryStatus = [
    { value: "member-of-un", label: "Member of the United Nations" },
    { value: "independent", label: "Independent" },
];