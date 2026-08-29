import { UserTypes } from "@/types/createPostTypes";
import { SetStateAction, Dispatch } from "react";
import { DeleteData } from "@/actions/createPost";

interface DeleteProps {
  name: string;
  id: string | undefined;
  deletUser: Dispatch<SetStateAction<UserTypes | undefined>>;
}

export function DeleteUser({ name, id, deletUser }: DeleteProps) {
  function handleDeleteData() {
    deletUser(undefined);
    DeleteData(id);
  }

  return (
    <section className="fixed rounded-sm w-full flex items-center justify-center h-full z-10 top-2/4 left-2/4 -translate-2/4 bg-black/80 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
      <div className="bg-white w-2/4 h-2/4 rounded-md flex gap-5 flex-col items-center justify-center">
        <h1 className="text-lg text-gray-500">
          Do you want to delete{" "}
          <span className="uppercase font-bold text-lg text-black">{name}</span>{" "}
          Data?
        </h1>
        <button
          onClick={handleDeleteData}
          className="bg-blue-400 cursor-pointer px-5 py-2 rounded-sm text-white font-bold"
        >
          Confirm
        </button>
      </div>
    </section>
  );
}
