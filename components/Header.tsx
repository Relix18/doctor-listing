"use client";
import React, { useState } from "react";
import AddDoctorModal from "./add-doctor-modal";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setSearch(value);
    const query = `?search=${encodeURIComponent(value)}`;
    router.push(query);
  };

  return (
    <>
      <AddDoctorModal open={open} setOpen={setOpen} />
      <div className="flex shadow-md items-center justify-between gap-2 p-4 bg-white">
        <h1 className="font-bold text-xl">Doctor Listing</h1>
        <div className="w-[60%] text-2xl bg-gray-100 relative rounded">
          <SearchIcon className="absolute top-1.5 left-1" />
          <Input
            placeholder="Search Doctor, Specialities or Location..."
            className=" pl-8 pr-2 "
            value={search}
            onChange={handleSearch}
            type="text"
          />
        </div>
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          List New Doctor
        </button>
      </div>
    </>
  );
};

export default Header;
