"use client";

import { SortByType, Option } from "../../lib/types";

import {
  sortingOptions,
  filterRegions,
  countryStatus,
} from "../../lib/constants";
import { useState } from "react";

export default function SortFilters() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const isCheckboxChecked = (value: string) => selectedRegions.includes(value);

  const handleRegionChange = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(
        selectedRegions.filter((selectedRegion) => selectedRegion !== region)
      );
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const labelBackgroundColor = (region: string) => {
    return selectedRegions.includes(region) ? "bg-jet" : "bg-bunker";
  };

  const handleStatusChange = (status: string) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(
        selectedStatus.filter((selectedStatus) => selectedStatus !== status)
      );
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
    console.info("selectedStatus", selectedStatus);
  };

  const customCheckboxColor = (status: string) => {
    return selectedStatus.includes(status)
      ? "bg-dodger-blue border-dodger-blue bg-custom-checkbox"
      : "bg-bunker border-shuttle-gray";
  };

  return (
    <div className='mt-6'>
      <p className='text-sm text-shuttle-gray'>Sort by</p>
      <select
        name='sort-by'
        className='mt-2 bg-bunker rounded-lg text-light-grayish-blue text-sm w-64 p-2 border-2 border-shuttle-gray bg-right-10-center bg-expand-down bg-no-repeat appearance-none cursor-pointer'
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
              )}`}
              key={`${region.value}-${index}`}
              htmlFor={`${region.value}-${index}`}
            >
              {region.label}
              <input
                type='checkbox'
                value={region.value}
                className='sr-only'
                checked={isCheckboxChecked(region.value)}
                onChange={() => handleRegionChange(region.value)}
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
                onChange={() => handleStatusChange(status.value)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
