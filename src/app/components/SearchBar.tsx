"use client";

import { useState } from "react";
import Btn from "./Btn";
import { useParams, usePathname, useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handeInputChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("search", search);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <form
        className=" w-full flex items-center justify-center"
        onSubmit={handleSearch}
      >
        <input
          className=" w-full focus:outline-none focus:ring-1 focus:ring-black rounded-md p-2 mr-2"
          type="text"
          alt="Song title"
          value={search}
          onChange={handeInputChange}
        />
        <Btn text="Search" />
      </form>
    </div>
  );
};

export default SearchBar;
