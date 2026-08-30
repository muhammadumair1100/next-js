import { getUserDetails } from "@/actions/createPost";

type ParamsType = {
  params: Promise<{ userId: string }>;
};

export default async function UserDetails({ params }: ParamsType) {
  const { userId } = await params;
  const userDetails = await getUserDetails(userId);

  return (
    <section className="w-5/12 text-lg font-medium font-mono h-50 mt-20 bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-md flex flex-col gap-3 justify-center items-center">
      <h1>Name: {userDetails?.name}</h1>
      <h1>Age: {userDetails?.age}</h1>
      <h1>Location: {userDetails?.location}</h1>
    </section>
  );
}
