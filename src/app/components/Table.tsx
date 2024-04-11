import Image from "next/image";

import { Country } from "@/lib/types";
import { formatCountryNumbers } from "@/lib/utils";
import Link from "next/link";

interface TableProps {
  countries: Country[];
}

export function Table({ countries }: TableProps) {
  return (
    <div className='max-h-[30rem] overflow-y-auto'>
      <table className='table-auto w-full lg:w-[40rem] border-collapse'>
        {/* Colum names: flag, name, population, area, region*/}
        <thead>
          <tr className='text-left border-b-2 border-b-shuttle-gray'>
            <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>
              Flag
            </th>
            <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>
              Name
            </th>
            <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>
              Population
            </th>
            <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>
              Area (km²)
            </th>
            <th className='p-2 rounded-lg text-shuttle-gray text-xs py-6'>
              Region
            </th>
          </tr>
        </thead>
        <tbody className=''>
          {countries.map((country, index) => (
            <tr key={country.name.common} className=''>
              <td className={`p-2 ${index === 0 ? "pt-7" : "pt-4"}`}>
                <Link href={`/country/${country.name.common}`}>
                <Image
                  src={country.flags.png}
                  alt={country.name.common}
                  className='rounded-md w-auto'
                  width={64}
                  height={48}
                />
                </Link>
              </td>
              <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"}`}>
                <Link href={`/country/${country.name.common}`}>
                {country.name.common}
                </Link>
              </td>
              <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"}`}>
                <Link href={`/country/${country.name.common}`}>
                  {formatCountryNumbers(country.population)}
                </Link>
              </td>
              <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"}`}>
                <Link href={`/country/${country.name.common}`}>
                  {formatCountryNumbers(country.area)}
                </Link>
              </td>
              <td className={`p-2 ${index === 0 ? "pt-5" : "pt-4"}`}>
                <Link href={`/country/${country.name.common}`}>
                  {country.region}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
