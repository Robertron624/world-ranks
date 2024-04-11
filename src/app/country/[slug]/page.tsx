import axios, { AxiosResponse } from "axios";

import { countriesBaseUrl } from "@/lib/constants";
import { Country } from "@/lib/types";
import Image from "next/image";
import CountryBox from "@/app/components/countryPages/CountryBox";
import Link from "next/link";

const countryData = async (countryName: string) => {
  let url = `${countriesBaseUrl}/name/${countryName}`;

  try {
    const response: AxiosResponse<Country[]> = await axios.get(url);

    if (!response.data || response.data.length === 0) {
      throw new Error("Country not found.");
    }

    const data = response.data;

    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

const getExactCountry = async (countryName: string, countries: Country[]) => {
  return countries.find((country) => country.name.common === countryName);
}

export default async function CountryPage({
  params,
}: {
  params: { slug: string };
}) {
  const countries = await countryData(params.slug);

  if (countries === undefined) {
    return (
      <main>
        <h1>
            Country not found. Please try again with a valid country name.
        </h1>
      </main>
    );
  }

  const exactCountry = await getExactCountry(params.slug, countries);

  return (
    <main className='flex min-h-screen flex-col items-center bg-hero-pattern bg-no-repeat bg-contain bg-top py-20 bg-jet'>
      <div className='logo-container w-full flex justify-center'>
        <Link href='/'>
          <Image
            src='/Logo.svg'
            alt='World Ranks logo'
            width={200}
            height={100}
            className='w-auto'
          />
        </Link>
      </div>
        {exactCountry && <CountryBox country={exactCountry} />}
    </main>
  );
}
