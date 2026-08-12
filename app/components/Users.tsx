"use client";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function Users({ users }: { users: User[] }) {
  return (
    <div className="mt-10 flex flex-col gap-5">
      <h1>Users</h1>
      <ul className="flex flex-col gap-5">
        {users.slice(0, 3).map((user: User) => (
          <Link
            href={`/profile/${user.name.toLowerCase().replace(/\s+/g, "-")}`}
            key={user.id}
          >
            <h2>{user.name}</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>Company: {user.company.name}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
