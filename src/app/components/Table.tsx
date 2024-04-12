"use client";

import Image from "next/image";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";

import { Country } from "@/lib/types";
import { formatCountryNumbers } from "@/lib/utils";
import Link from "next/link";

interface CountryRowProps {
  country: Country;
  index: number;
}

function CountryRow({ country, index }: CountryRowProps) {

  // rowHasMoreVerticalPadding is used to add more padding to the top and bottom of the first of every 10 rows
  const rowHasMoreVerticalPadding = index % 10 === 0;

  return (
    <tr>
      <td className={`${rowHasMoreVerticalPadding ? 'py-5 px-2' : 'p-2'}`}>
        <Link href={`/country/${country.name.common}`}>
          <Image
            src={country.flags.png}
            alt={country.name.common}
            className='rounded-md w-auto min-h-[3rem] max-h-[3rem] max-w-[4rem] object-contain'
            width={64}
            height={48}
          />
        </Link>
      </td>
      <td className='p-2'>
        <Link href={`/country/${country.name.common}`}>
          {country.name.common}
        </Link>
      </td>
      <td className='p-2'>
        <Link href={`/country/${country.name.common}`}>
          {formatCountryNumbers(country.population)}
        </Link>
      </td>
      <td className='p-2'>
        <Link href={`/country/${country.name.common}`}>
          {formatCountryNumbers(country.area)}
        </Link>
      </td>
      <td className='p-2'>
        <Link href={`/country/${country.name.common}`}>{country.region}</Link>
      </td>
    </tr>
  );
}

interface TableProps {
  countries: Country[];
  sortBy: string; // needed for useEffect to trigger when sortBy changes
}

export function Table({ countries, sortBy }: TableProps) {
  const [pageNumber, setPageNumber] = useState(0);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const countriesPerPage = 10;

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country, index) => {
        return (
          index >= pageNumber * countriesPerPage &&
          index < (pageNumber + 1) * countriesPerPage
        );
      })
    );
  }, [pageNumber, countries, sortBy]);

  return (
    <div className=''>
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
          {filteredCountries &&
            filteredCountries.map((country, index) => (
              <CountryRow key={index} country={country} index={index}/>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <AiFillLeftCircle />
          </IconContext.Provider>
        }
        nextLabel={
          <IconContext.Provider value={{ size: "1.5rem" }}>
            <AiFillRightCircle />
          </IconContext.Provider>
        }
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(countries.length / countriesPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(data) => setPageNumber(data.selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
