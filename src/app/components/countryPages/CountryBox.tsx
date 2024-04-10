import { Country } from "@/lib/types";
import { formatCountryNumbers } from "@/lib/utils";
import Image from "next/image";




interface CountryDataTableProps {
    countryData: [string, string][]
}
function CountryDataTable({countryData}: CountryDataTableProps) {

    return (
        <div className="flex flex-col mt-10 w-full text-xs">
            {countryData.map(([key, value]) => (
                <div key={key} className="py-5 border-t border-b border-b-shuttle-gray border-t-shuttle-gray flex justify-between">
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
export default function CountryBox({country}: CountryBoxProps) {

    const countryData: [string, string][] = [
        ['Capital', country.capital[0] || 'N/A'],
        ['Subregion', country.subregion || 'N/A'],
        ['Languages', Object.values(country.languages).join(', ')],
        ['Currencies', Object.values(country.currencies).map(currency => `${currency.name}`).join(', ')],
        ['Continents', country.continents.join(', ')],
    ]

    return (
        <section className="pb-4 bg-jet text-light-grayish-blue w-full max-w-xl mt-20 rounded-lg flex flex-col items-center shadow-box">
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
                    <span className="px-4  border-r-[1px] border-r-bunker">
                        Population
                    </span>
                    <span className="px-4">
                        {formatCountryNumbers(country.population)}
                    </span>
                </div>
                <div className="py-2 rounded-md bg-bunker">
                    <span className="px-4  border-r-[1px] border-r-bunker">
                        Area
                    </span>
                    <span className="px-4">
                        {formatCountryNumbers(country.area)} km<sup>2</sup>
                    </span>
                </div>
            </div>
            <CountryDataTable countryData={countryData} />
        </section>
    )
}