import Users from "@/app/components/Users";

export default async function AppDev() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
  return (
    <div>
      <h1>App-Development</h1>
      <Users users={data} />
    </div>
  );
}
