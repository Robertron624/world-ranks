"use client";

import { useEffect, useState } from "react";

import { countriesBaseUrl } from "../../lib/constants";
import {
  Country,
  SortByOption,
  RegionOption,
  CountryStatusOption,
} from "../../lib/types";
import {
  sortCountriesBy,
  filterCountriesByRegion,
  filterCountriesByStatus,
} from "../../lib/utils";
import { Search } from "./Search";
import SortFilters from "./SortingFilters";
import { Table } from "./Table";
import TableSkeleton from "./skeletons/TableSkeleton";

export default function MainBox() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [currentCountries, setCurrentCountries] = useState<Country[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<RegionOption[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<CountryStatusOption[]>(
    []
  );
  const [sortBy, setSortBy] = useState<SortByOption>("population");

  useEffect(() => {
    async function getCountries(
      orderBy: string,
      order: "asc" | "desc" = "asc"
    ) {
      let url = `${countriesBaseUrl}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("An error occurred while fetching the data.");
        }

        const data = await response.json();

        const first20Countries = data.slice(0, 20);

        const orderedCountries = sortCountriesBy(orderBy, data, order);

        setAllCountries(orderedCountries);
        setCurrentCountries(orderedCountries);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }

    getCountries("population", "desc");
  }, []);

  const handleSortByChange = (sortBy: SortByOption) => {
    setSortBy(sortBy);

    const sortedCountries = sortCountriesBy(sortBy, currentCountries);

    setCurrentCountries(sortedCountries);
  };

  const handleRegionChange = (region: RegionOption) => {
    if (selectedRegions.includes(region)) {
      const newRegions = selectedRegions.filter((r) => r !== region);

      setSelectedRegions(newRegions);

      const filteredCountries = filterCountriesByRegion(
        allCountries,
        newRegions
      );

      const sortedFilteredCountries = sortCountriesBy(sortBy, filteredCountries);

      setCurrentCountries(sortedFilteredCountries);

      return;
    }

    const newRegions = [...selectedRegions, region];

    setSelectedRegions(newRegions);

    const filteredCountries = filterCountriesByRegion(allCountries, newRegions);

    const sortedFilteredCountries = sortCountriesBy(sortBy, filteredCountries);

    setCurrentCountries(sortedFilteredCountries);
  };

  const handleStatusChange = (status: CountryStatusOption) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
      return;
    }

    setSelectedStatus([...selectedStatus, status]);

    const filteredCountries = filterCountriesByStatus(
      currentCountries,
      selectedStatus
    );

    setCurrentCountries(filteredCountries);
  };

  return (
    <section className='p-4 bg-bunker text-light-grayish-blue w-full max-w-5xl mt-20 rounded-md'>
      <div className='flex justify-between w-full items-center text-shuttle-gray'>
        <p>Found {currentCountries.length} countries</p>
        <Search />
      </div>
      <div className='flex justify-between w-full mt-10'>
        <SortFilters
          onSortByChange={handleSortByChange}
          onRegionChange={handleRegionChange}
          onStatusChange={handleStatusChange}
          selectedRegions={selectedRegions}
          selectedStatus={selectedStatus}
        />
        {currentCountries.length > 0 ? (
          <Table countries={currentCountries.slice(0, 20)} />
        ): (<TableSkeleton />)}
      </div>
    </section>
  );
}
