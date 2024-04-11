"use client";

import { FormEvent } from "react"
import Image from "next/image";

interface SearchProps {
    onSubmit: (searchQuery: string) => void;
}

export function Search(
    {onSubmit}: SearchProps
) {

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const searchQuery = formData.get("searchQuery") as string;
        
        onSubmit(searchQuery);
    }

    return(
        <form 
            onSubmit={handleSubmit} 
            className="flex justify-center items-center relative"
        >
            <Image 
                src="/Search.svg" 
                alt="Search icon" 
                width={20} 
                height={20} 
                className="absolute left-2"
            />
            <input 
                type="text" 
                name="searchQuery" 
                placeholder="Search by Name, Region, Subregion" 
                className="p-3 pl-8 rounded-md border border-gray-300 w-80 bg-bunker border-none placeholder:text-shuttle-gray"
            />
        </form>
    )
}