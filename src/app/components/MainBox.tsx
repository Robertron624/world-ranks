"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
  searchCountriesByName,
  searchCountriesByRegion,
  searchCountriesBySubregion
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
      let url = `${countriesBaseUrl}/all`;

      try {
        const response = await axios.get(url);

        if (!response.data) {
          throw new Error("An error occurred while fetching the data.");
        }

        const data = await response.data;

        const orderedCountries = sortCountriesBy(orderBy, data, order);

        setAllCountries(orderedCountries);
        setCurrentCountries(orderedCountries);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }

    getCountries("population", "desc");
  }, []);

  const handleSortByChange = (sortByOption: SortByOption) => {

    if (sortByOption === sortBy) {
      return;
    }

    setSortBy(sortByOption);

    const sortedCountries = sortCountriesBy(sortByOption, currentCountries);

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

  const onSearchSubmit = (searchTerm: string) => {
    
    let foundByName = searchCountriesByName(allCountries, searchTerm);

    if(foundByName.length > 0) {
      setCurrentCountries(foundByName);
      return;
    }

    let foundByRegion = searchCountriesByRegion(allCountries, searchTerm);

    if(foundByRegion.length > 0) {
      setCurrentCountries(foundByRegion);
      return;
    }

    let foundBySubregion = searchCountriesBySubregion(allCountries, searchTerm);

    if(foundBySubregion.length > 0) {
      setCurrentCountries(foundBySubregion);
      return;
    }

    // if no results are found, show an error toast

    toast.error("No countries found with that search term.", {
      duration: 4000,
    });

  };

  return (
    <section className='p-4 bg-jet shadow-box text-light-grayish-blue w-full max-w-5xl mt-20 rounded-md'>
      <div className='flex justify-between w-full items-center text-shuttle-gray'>
        <p>Found {currentCountries.length} countries</p>
        <Search onSubmit={onSearchSubmit}/>
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
          <Table countries={currentCountries} sortBy={sortBy}/>
        ): (<TableSkeleton />)}
      </div>
    </section>
  );
}
