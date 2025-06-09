"use client"

import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import { useAppSelector } from "@/logic/hooks";

export default function UserLayout({ children }) {
    const user = useAppSelector((state) => state.user.user);
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-4 px-16 py-8 bg-gray-50 min-h-screen">
            <Header title={pathname.split("/").pop().charAt(0).toUpperCase() + pathname.split("/").pop().slice(1) === "User" ? "Kullanıcılar" : user ? `${user.firstName} ${user.lastName}` : "Kullanıcı Detayı"} /> 
            {children}
        </div>
    )
}