import axios, { AxiosResponse } from "axios";

import { countriesBaseUrl } from "@/lib/constants";
import { Country } from "@/lib/types";
import Image from "next/image";
import CountryBox from "@/app/components/countryPages/CountryBox";

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

export default async function CountryPage({
  params,
}: {
  params: { slug: string };
}) {
  const country = await countryData(params.slug);

  if (country === undefined) {
    return (
      <main>
        <h1>
            Country not found. Please try again with a valid country name.
        </h1>
      </main>
    );
  }

  return (
    <main className='flex min-h-screen flex-col items-center bg-hero-pattern bg-no-repeat bg-contain bg-top pt-20 bg-jet'>
      <div className='logo-container w-full flex justify-center'>
        <Image
          src='/Logo.svg'
          alt='World Ranks logo'
          width={200}
          height={100}
          className='w-auto'
        />
      </div>
        <CountryBox country={country[0]} />
    </main>
  );
}
