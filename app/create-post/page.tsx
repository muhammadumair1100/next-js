"use client";

import { useState } from "react";
import { UserTypes } from "@/types/createPostTypes";
import { addData } from "@/actions/createPost";

export default function CreatePost() {
  let [formData, setFormData] = useState<UserTypes>({
    name: "",
    age: "",
    location: "",
  });

  function handleAddData() {
    addData(formData);
    setFormData({ ...formData, name: "", age: "", location: "" });
  }

  return (
    <div className="w-2/4 flex flex-col gap-8 mx-auto py-10">
      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="title" className="">
          Name
        </label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          type="text"
          name="title"
          id="title"
          placeholder="Enter Name"
          className="border w-full outline-none rounded-sm px-2 py-1.5 border-gray-400 text-gray-500 placeholder:font-medium"
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="number" className="">
          Age
        </label>
        <input
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          type="text"
          name="number"
          id="title"
          placeholder="Enter Age"
          className="border w-full outline-none rounded-sm px-2 py-1.5 border-gray-400 text-gray-500 placeholder:font-medium"
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="location" className="">
          Location
        </label>
        <input
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          type="text"
          name="location"
          id="location"
          placeholder="Enter Location"
          className="border w-full outline-none rounded-sm px-2 py-1.5 border-gray-400 text-gray-500 placeholder:font-medium"
        />
        <button
          onClick={() => handleAddData()}
          className="bg-emerald-300 mt-3 text-white py-2 text-lg font-medium cursor-pointer rounded-sm w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
