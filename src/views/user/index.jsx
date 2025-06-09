"use client";

import Table from "@/components/Table";
import Link from "next/link";
import { useMemo } from "react";

export default function User({ userData, initialPageIndex, initialPageSize }) {
    const columns = useMemo(() => {
        return columnsData.map((column) => ({
            header: column.label,
            accessorKey: column.key,
            cell: column.cell
        }))
    }, [])

    return (
        <Table 
            data={userData?.users || []} 
            columns={columns} 
            error={null} 
            pageSize={initialPageSize}
            pageIndex={initialPageIndex}
            totalRows={userData?.total || 0}
            useUrlPagination={true}
            basePath="/user"
            pageParamName="page"
            limitParamName="limit"
        />
    )
}

const columnsData = [
    {
        label: "Kullanıcı",
        key: "firstName",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img 
                            src={user.image} 
                            alt="User" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-sm" 
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/48x48/6366f1/white?text=' + (user.firstName?.charAt(0) || 'U');
                            }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                            {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block w-fit">
                            {user.age} yaşında
                        </span>
                    </div>
                </div>
            )
        }
    },
    {
        label: "Email",
        key: "email",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${user.email}`} className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
                        {user.email}
                    </a>
                </div>
            )
        }
    },
    {
        label: "Telefon",
        key: "phone",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm text-gray-700">{user.phone}</span>
                </div>
            )
        }
    },
    {
        label:"Cinsiyet",
        key: "gender",
        cell: ({ row }) => {
            const user = row.original;
            const isMale = user.gender === "male";
            return (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    isMale ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                }`}>
                    {isMale ? (
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM4 8a4 4 0 118 0 4 4 0 01-8 0zm9-3a1 1 0 100-2h4a1 1 0 001-1V1a1 1 0 10-2 0v.586l-2.293-2.293a1 1 0 00-1.414 1.414L14.586 3H14a1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 6a3 3 0 106 0 3 3 0 00-6 0zM2 17v-2a2 2 0 012-2h4a2 2 0 012 2v2a1 1 0 11-2 0v-2H4v2a1 1 0 11-2 0zm8-10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                    )}
                    {isMale ? "Erkek" : "Kadın"}
                </span>
            )
        }
    },
    {
        label: "İşlemler",
        key: "actions",
        cell: ({ row }) => {
            const user = row.original;
            return <Link className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200" href={`/user/${user.id}`}>Detay</Link>
        }
    }
]