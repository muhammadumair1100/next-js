"use client";

import { DeleteUser } from "./deleteUser";
import { useEffect, useState } from "react";
import { UserTypes } from "@/types/createPostTypes";
import { getData, updateData } from "@/actions/createPost";
import { EmptyStore } from "./EmptyStore";
import Link from "next/link";

export default function WatchPost() {
  const [userData, setUserData] = useState<UserTypes[] | null>([]);
  const [update, setUpdate] = useState<string | undefined>(undefined);
  const [updateField, setUpdateField] = useState<UserTypes>({
    name: "",
    age: "",
    location: "",
  });
  const [inputData, setInputData] = useState<UserTypes>({
    name: "",
    age: "",
    location: "",
  });
  const [deletUser, setDeletUser] = useState<UserTypes>();

  useEffect(() => {
    async function catchData() {
      try {
        const data = await getData();
        setUserData(data);
      } catch (error) {
        setUserData(null);
      }
    }
    catchData();
  }, []);

  function handleInputsValue(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value.toLowerCase() });
  }

  function handleUpdateData(formData: UserTypes) {
    setUpdate(formData.id);
    setInputData({ ...formData });
  }

  function handleConfirmData(id: string | undefined) {
    setUpdate(undefined);
    setUpdateField({
      ...updateField,
      name: "",
      age: "",
      location: "",
    });
    updateData(id, inputData);
  }

  function handleUpdateField(field: string) {
    setUpdateField({ ...updateField, [field]: field });
  }

  function handleDeleteData(formData: UserTypes) {
    setDeletUser(formData);
  }

  return (
    <>
      {deletUser && (
        <DeleteUser
          name={deletUser.name}
          id={deletUser.id}
          deletUser={setDeletUser}
        />
      )}
      {userData && userData.length > 0 ? (
        <div className="relative w-2/4 mt-20 rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Age</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-bold">Update</th>
                <th className="px-6 py-4 font-bold">Delete</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {userData.map((d) => (
                <tr key={d.id} className="relative transition hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">
                    {d.id}
                  </td>

                  {updateField.name === "name" && update === d.id ? (
                    <td>
                      <input
                        value={inputData.name}
                        onChange={handleInputsValue}
                        name="name"
                        type="text"
                        placeholder="name"
                        className="outline-none w-fit border pl-3 rounded"
                      />
                    </td>
                  ) : (
                    <td className="px-6 py-4 hover:underline font-medium text-gray-900">
                      <Link href={`watch-post/${d.id}`}>{d.name}</Link>
                    </td>
                  )}

                  {updateField.age === "age" && update === d.id ? (
                    <td>
                      <input
                        value={inputData.age}
                        onChange={handleInputsValue}
                        name="age"
                        type="text"
                        placeholder="age"
                        className="outline-none w-fit border pl-3 rounded"
                      />
                    </td>
                  ) : (
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {d.age}
                    </td>
                  )}

                  {updateField.location === "location" && update === d.id ? (
                    <td>
                      <input
                        value={inputData.location}
                        onChange={handleInputsValue}
                        name="location"
                        type="text"
                        placeholder="location"
                        className="outline-none w-fit border pl-3 rounded"
                      />
                    </td>
                  ) : (
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {d.location}
                    </td>
                  )}

                  {update === d.id ? (
                    <td
                      onClick={() => handleConfirmData(d.id)}
                      className="font-extrabold cursor-pointer px-6 py-4 rounded-sm"
                    >
                      Confirm
                    </td>
                  ) : (
                    <td
                      onClick={() => handleUpdateData(d)}
                      className="font-extrabold cursor-pointer px-6 py-4 rounded-sm"
                    >
                      Update
                    </td>
                  )}

                  <td
                    onClick={() => handleDeleteData(d)}
                    className="font-extrabold text-red-500 cursor-pointer px-6 py-4 rounded-sm"
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {update && (
            <div
              style={{ top: 0 }}
              className="absolute cursor-pointer text-left text-sm flex flex-col gap-4 shadow-[0_0px_20px_0_rgba(0,0,0,0.15)] rounded-md left-[calc(100%+20px)] bg-white z-10 px-6 py-4"
            >
              <span onClick={(e) => handleUpdateField("name")}>Name</span>
              <span onClick={(e) => handleUpdateField("age")}>Age</span>
              <span onClick={(e) => handleUpdateField("location")}>
                Location
              </span>
            </div>
          )}
        </div>
      ) : (
        <EmptyStore />
      )}
    </>
  );
}
