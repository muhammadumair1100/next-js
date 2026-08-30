import { UserTypes } from "@/types/createPostTypes";

export function FilterTable({ usersData }: { usersData: UserTypes[] }) {
  return (
    <section>
      <table className="border border-neutral-300 flex flex-col rounded-sm overflow-hidden">
        <thead>
          <tr className="flex py-3  bg-gray-200 justify-evenly">
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-300">
          {usersData.map((user, idx) => (
            <tr
              key={idx}
              className="flex font-mono py-3 hover:bg-gray-100 text-left justify-evenly"
            >
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
