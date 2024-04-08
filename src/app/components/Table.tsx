import Image from "next/image";

import { Country } from "@/lib/types";

interface TableProps {
  countries: Country[];
}

export function Table({ countries }: TableProps) {
  return <div className=''>
    <table
        className='table-auto w-full lg:w-[40rem] border-collapse'
    >
        {/* Colum names: flag, name, population, area, region*/}
        <thead>
          <tr className='text-left border-b-2 border-b-shuttle-gray'>
            <th className='p-2 rounded-lg text-shuttle-gray text-sm py-6'>Flag</th>
            <th className='p-2 rounded-lg text-shuttle-gray text-sm py-6'>Name</th>
            <th className='p-2 rounded-lg text-shuttle-gray text-sm py-6'>Population</th>
            <th className='p-2 rounded-lg text-shuttle-gray text-sm py-6'>Area (km2)</th>
            <th className='p-2 rounded-lg text-shuttle-gray text-sm py-6'>Region</th>
          </tr>
        </thead>
        <tbody className="">
          {countries.map((country, index) => (
            <tr key={country.name.common} className=''>
              <td className={`p-2 ${index === 0 ? 'pt-7' : 'pt-4'}`}>
                <Image
                  src={country.flags.png}
                  alt={country.name.common}
                  className='w-[50px] h-10 rounded-md'
                    width={50}
                    height={40}
                />
              </td>
              <td className={`p-2 ${index === 0 ? 'pt-7' : 'pt-4'}`}>{country.name.common}</td>
              <td className={`p-2 ${index === 0 ? 'pt-7' : 'pt-4'}`}>{country.population}</td>
              <td className={`p-2 ${index === 0 ? 'pt-7' : 'pt-4'}`}>{country.area}</td>
              <td className={`p-2 ${index === 0 ? 'pt-7' : 'pt-4'}`}>{country.region}</td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>;
}
