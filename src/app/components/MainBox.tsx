import { useState } from "react"

import { countriesBaseUrl } from "../constants";
import { Country } from "../types";
import { sortCountriesByPopulation } from "../utils";

async function getAllPosts(orderBy: string, order: "asc" | "desc" = "asc") {
    let url = `${countriesBaseUrl}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("An error occurred while fetching the data.");
    }

    const data = await response.json();

    if(orderBy === "population") {
        return sortCountriesByPopulation(data, order);
    }

    return data;
}

export default async function MainBox() {

    const allPosts = await getAllPosts("population", "desc");


    console.log("allPosts", allPosts);


    return(
        <section className="p-4 bg-bunker text-light-grayish-blue w-full max-w-5xl mt-20 rounded-md">

        </section>
    )
}