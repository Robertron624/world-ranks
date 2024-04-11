"use client";

import { CountryStatusOption, RegionOption, SortByOption } from "../../lib/types";

import {
  sortingOptions,
  filterRegions,
  countryStatus,
} from "../../lib/constants";


interface SortFiltersProps {
  onSortByChange: (sortBy: SortByOption) => void;
  onRegionChange: (region: RegionOption) => void;
  onStatusChange: (status: CountryStatusOption) => void;
  selectedRegions: string[];
  selectedStatus: string[];
}

export default function SortFilters(
  {
    onSortByChange,
    onRegionChange,
    onStatusChange,
    selectedRegions,
    selectedStatus,
  }: SortFiltersProps
) {


  const isCheckboxChecked = (value: string) => selectedRegions.includes(value);


  const labelBackgroundColor = (region: string) => {
    return selectedRegions.includes(region) ? "bg-dodger-blue" : "bg-bunker";
  };


  const customCheckboxColor = (status: string) => {
    return selectedStatus.includes(status)
      ? "bg-dodger-blue border-dodger-blue bg-custom-checkbox"
      : "bg-jet border-shuttle-gray";
  };

  return (
    <div>
      <p className='text-sm text-shuttle-gray'>Sort by</p>
      <select
        name='sort-by'
        className='mt-2 bg-bunker rounded-lg text-light-grayish-blue text-sm w-64 p-2 border-2 border-shuttle-gray bg-right-10-center bg-expand-down bg-no-repeat appearance-none cursor-pointer'
        onChange={(e) => onSortByChange(e.target.value as SortByOption)}
      >
        {sortingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className='mt-6'>
        <p className='text-sm text-shuttle-gray'>Regions</p>
        <div className='flex mt-4 max-w-56 flex-wrap gap-1'>
          {filterRegions.map((region, index) => (
            <label
              className={`p-2 rounded-lg text-sm text-light-grayish-blue cursor-pointer ${labelBackgroundColor(
                region.value
              )} hover:bg-dodger-blue duration-300 transition-all`}
              key={`${region.value}-${index}`}
              htmlFor={`${region.value}-${index}`}
            >
              {region.label}
              <input
                type='checkbox'
                value={region.value}
                className='sr-only'
                checked={isCheckboxChecked(region.value)}
                onChange={() => onRegionChange(region.value as RegionOption)}
                id={`${region.value}-${index}`}
              />
            </label>
          ))}
        </div>
      </div>
      <div className='mt-6'>
        <p className='text-sm text-shuttle-gray'>Status</p>
        <div className='flex flex-col gap-3 mt-2'>
          {countryStatus.map((status, index) => (
            <label
              className='p-2 rounded-lg text-sm text-light-grayish-blue cursor-pointer flex gap-2 items-center'
              key={`${status.value}-${index}`}
              htmlFor={`${status.value}-${index}`}
            >
              <span
                className={`bg-center w-6 h-6 border-2 rounded flex items-center transition-all duration-200 justify-center ${customCheckboxColor(
                  status.value
                )}`}
              ></span>

              {status.label}
              <input
                type='checkbox'
                value={status.value}
                className='sr-only'
                id={`${status.value}-${index}`}
                checked={selectedStatus.includes(status.value)}
                onChange={() => onStatusChange(status.value as CountryStatusOption)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
