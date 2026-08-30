"use client";

import { useState } from "react";
import { FilterTable } from "./FilterTables";
import { getByNameAge } from "@/actions/createPost";
import { UserTypes } from "@/types/createPostTypes";

export default function Filter() {
  const [nameAge, setNameAge] = useState<{ name: string; age: string }>({
    name: "",
    age: "",
  });

  const [userNameAge, setUserNameAge] = useState<UserTypes[] | undefined>();

  function handleNameAge(field: string, inpVal: string) {
    setNameAge({ ...nameAge, [field]: inpVal });
  }

  async function handleSearch() {
    const nameAgeData = await getByNameAge(nameAge);
    setUserNameAge(nameAgeData);
    console.log(nameAgeData);
  }

  return (
    <section className="mt-30 flex flex-col gap-10">
      <div className="flex items-center gap-15">
        <div className=" flex gap-2">
          <input
            value={nameAge.name}
            onChange={(e) =>
              handleNameAge(e.target.name, e.target.value.trim())
            }
            className="border pl-3 py-1.5 rounded-sm outline-0"
            type="text"
            name="name"
            placeholder="Search Name"
          />
          <input
            value={nameAge.age}
            onChange={(e) =>
              handleNameAge(e.target.name, e.target.value.trim())
            }
            className="border rounded-sm pl-3 outline-0"
            type="text"
            name="age"
            placeholder="Search Age"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-cyan-200 cursor-pointer font-mono font-medium px-4 py-1.5 border border-gray-300 rounded-sm"
        >
          Search!
        </button>
      </div>
      {userNameAge && userNameAge.length > 0 && (
        <FilterTable usersData={userNameAge} />
      )}
    </section>
  );
}
