"use client";

import { useState } from "react";
import Btn from "./Btn";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="w-full">
      <form
        className="w-full flex items-center justify-center"
        onSubmit={handleSearch}
      >
        <input
          className="w-full focus:outline-none focus:ring-1 focus:ring-black rounded-md p-2 mr-2"
          type="text"
          placeholder="Search Reddit"
          value={search}
          onChange={handleInputChange}
        />
        <Btn text="Search" />
      </form>
    </div>
  );
};

export default SearchBar;