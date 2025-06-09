"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex flex-row items-center justify-between h-10 gap-4 bg-amber-300 p-16 rounded-b-lg">
            <Link href="/" className="text-2xl font-bold hover:underline ">Home</Link>
            <Link href="/user" className="text-2xl font-bold hover:underline">User</Link>
        </div>
    )
}