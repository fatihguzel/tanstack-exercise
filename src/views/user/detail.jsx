"use client"    

// Logic
import InfoCard from "@/components/InfoCard";
import { _setUser } from "@/reducers/user";
import { useAppDispatch } from "@/logic/hooks";
import { useEffect } from "react";

export default function UserDetail({ userData }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userData) {
            dispatch(_setUser(userData));
        }
    }, [userData, dispatch]);

    return (
        <div className="flex flex-col gap-4">
            <InfoCard data={userData} />
        </div>
    )
}