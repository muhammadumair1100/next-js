"use client";

export default function Home() {
  return (
    <div className="text-lg mt-10 w-5/12 h-80 flex  flex-col items-center rounded-md justify-center font-medium bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)]">
      <h1 className="text-gray-500">
        Want To Create Post?{" "}
        <span className="uppercase text-black">Click Post Button!</span>
      </h1>
      <h1 className="text-gray-500">
        Want To Watch Post?{" "}
        <span className="uppercase text-black">Click Watch Button!</span>
      </h1>
    </div>
  );
}
