type ProfileProps = {
  params: Promise<{ name: string }>;
};

export default async function UserProfile({ params }: ProfileProps) {
  const { name } = await params;

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  const user = data.find(
    (user: any) => user.name.toLowerCase().replace(/\s+/g, "-") === name,
  );

  console.log(user);

  return (
    <div className="flex flex-col gap-5">
      <h1>User Profile</h1>

      <div>
        <h1>Username: {user.username}</h1>
        <h1>Name: {user.name}</h1>
        <h1>Email: {user.email}</h1>
        <h1>Phone: {user.phone}</h1>
        <h1>Website: {user.website}</h1>
        <h1>Company: {user.company.name}</h1>
      </div>
    </div>
  );
}
