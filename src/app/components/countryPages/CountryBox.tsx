import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";

import { Country } from "@/lib/types";
import { formatCountryNumbers } from "@/lib/utils";
import { countriesBaseUrl } from "@/lib/constants";

async function getNeighboringCountries(borders: string[]) {

    const url = `${countriesBaseUrl}/alpha?codes=${borders.join(',')}`;

    try {
        const response: AxiosResponse<Country[]> = await axios.get(url);

        if (!response.data || response.data.length === 0) {
            throw new Error("Country not found.");
        }

        const data = response.data;

        return data;
    
    }catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

interface CountryDataTableProps {
    countryData: [string, string][]
}
function CountryDataTable({countryData}: CountryDataTableProps) {

    return (
        <div className="flex flex-col mt-10 w-full text-xs border-b-shuttle-gray border-b">
            {countryData.map(([key, value]) => (
                <div key={key} className="py-5 border-t border-t-shuttle-gray flex justify-between">
                    <span className="px-4 text-shuttle-gray">
                        {key}
                    </span>
                    <span className="px-4">
                        {value}
                    </span>
                </div>
            ))}
        </div>
    )
}

interface CountryBoxProps {
    country: Country
}
export default async function CountryBox({country}: CountryBoxProps) {

    const countryData: [string, string][] = [
        ['Capital', country.capital[0] || 'N/A'],
        ['Subregion', country.subregion || 'N/A'],
        ['Languages', Object.values(country.languages).join(', ')],
        ['Currencies', Object.values(country.currencies).map(currency => `${currency.name}`).join(', ')],
        ['Continents', country.continents.join(', ')],
    ]

    const neighboringCountries = await getNeighboringCountries(country.borders);

    return (
        <main className="pb-4 bg-jet text-light-grayish-blue w-full max-w-xl mt-20 rounded-lg flex flex-col items-center shadow-box">
            <div className="mx-auto max-w-[220px] w-full -mt-10">
                <Image src={country.flags.png} alt={country.name.common} width={220} height={160} className="object-cover rounded-md min-h-[160px] h-auto" />
            </div>
            <div className="mt-[4%]">
                <h1 className="text-2xl font-bold">{country.name.common}</h1>
                <p className='text-sm'>
                    {country.name.official}
                </p>	
            </div>
            <div className="flex gap mt-10 text-sm justify-between w-[82%]">
                <div className="py-2 rounded-md bg-bunker">
                    <span className="px-4  border-r border-r-jet">
                        Population
                    </span>
                    <span className="px-4">
                        {formatCountryNumbers(country.population)}
                    </span>
                </div>
                <div className="py-2 rounded-md bg-bunker">
                    <span className="px-4  border-r border-r-jet">
                        Area
                    </span>
                    <span className="px-4">
                        {formatCountryNumbers(country.area)} km<sup>2</sup>
                    </span>
                </div>
            </div>
            <CountryDataTable countryData={countryData} />
            <div className="mt-4 w-full px-4">
                <p className="text-sm text-shuttle-gray">
                    Neighboring countries
                </p>
                <div className="flex gap-4 mt-4 flex-wrap">
                    {neighboringCountries !== undefined ? neighboringCountries.map((neighboringCountry: Country) => (
                        <div key={neighboringCountry.cca3} className="flex flex-col items-center">

                            <Link
                                href={`/country/${neighboringCountry.name.common}`}
                            >
                                <Image src={neighboringCountry.flags.png} alt={neighboringCountry.name.common} width={60} height={50} className="object-cover rounded-sm min-h-[40px] h-auto" />
                                <p className="text-xs mt-2">
                                    {neighboringCountry.name.common}
                                </p>
                            </Link>
                        </div>
                    )): <p className="text-sm text-shuttle-gray">No neighboring countries found.</p>}
                </div>
            </div>
        </main>
    )
}