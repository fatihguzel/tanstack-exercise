"use client";

export default function Header({ title }) {
    return (
        <div className="flex flex-col items-center justify-start w-max">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    )
}   