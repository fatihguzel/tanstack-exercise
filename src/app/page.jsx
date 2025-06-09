import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-start h-screen gap-4 px-16 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Tanstack Exercise</h1> 
      <p className="text-gray-500">
        This is a simple exercise to practice Tanstack.
      </p>
      <Link href="/user" className="text-blue-500">User</Link>
    </div>
  )
}
