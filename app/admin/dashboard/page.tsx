import Link from "next/link";
export default function Dashborad() {
  return (
    <>

      <div className="relative h-screen w-screen overflow-hidden bg-background justify-items-center">admin</div>
        <Link href="/" className="absolute bottom-10 right-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-full shadow-lg" />

    </>
  );
}
