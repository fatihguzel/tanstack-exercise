"use client";

export default function Spin({ size = "w-10 h-10" }) {

    return (
        <div className="flex items-center justify-center">
            <div className={`animate-spin rounded-full ${size} border-t-2 border-b-2 border-gray-900`}></div>
        </div>
    )
}