import Button from "@/app/components/Button";
import Users from "@/app/components/Users";

export default async function Contact() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return (
    <div>
      <h1>Contact</h1>

      <Users users={data} />
      <Button text="Contact" />
    </div>
  );
}
