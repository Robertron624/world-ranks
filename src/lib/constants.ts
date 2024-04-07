export const countriesBaseUrl = "https://restcountries.com/v3.1/all";
import { Option } from "./types";


export const sortingOptions: Option[] = [
    { value: "name", label: "Name" },
    { value: "population", label: "Population" },
    { value: "area", label: "Area" },
    { value: "gini", label: "Gini" },
];

export const filterRegions: Option[] = [
    { value: "africa", label: "Africa" },
    { value: "antartica", label: "Antartica"},
    { value: "americas", label: "Americas" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "oceania", label: "Oceania" },
];

export const countryStatus = [
    { value: "member-of-un", label: "Member of the United Nations" },
    { value: "independent", label: "Independent" },
];