import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useTransition, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Spin from "./Spin";

export default function Table({ 
    columns, 
    data, 
    loading = false, 
    error, 
    pageSize = 10, 
    pageIndex = 0, 
    totalRows = 0, 
    onPageChange, 
    setPageSize,
    useUrlPagination = false,
    basePath = '',
    pageParamName = 'page',
    limitParamName = 'limit'
}) {
    const [isPending, startTransition] = useTransition();
    const [isInternalLoading, setIsInternalLoading] = useState(false);
    
    const router = useUrlPagination ? useRouter() : null;
    const searchParams = useUrlPagination ? useSearchParams() : null;

    useEffect(() => {
        setIsInternalLoading(isPending);
    }, [isPending]);

    const finalLoading = loading || isInternalLoading;

    const hasData = data && Array.isArray(data) && data.length > 0;
    const isEmpty = !finalLoading && !error && (!data || data.length === 0);

    const handleUrlPageChange = (newPageIndex) => {
        if (!useUrlPagination || !router || !searchParams) return;
        
        const params = new URLSearchParams(searchParams);
        params.set(pageParamName, (newPageIndex + 1).toString());
        router.push(`${basePath}?${params.toString()}`);
    };

    const handleUrlPageSizeChange = (newPageSize) => {
        if (!useUrlPagination || !router || !searchParams) return;
        
        const params = new URLSearchParams(searchParams);
        params.set(limitParamName, newPageSize.toString());
        params.set(pageParamName, '1'); // Reset to first page (1-based)
        router.push(`${basePath}?${params.toString()}`);
    };

    const finalPageChangeHandler = useUrlPagination ? handleUrlPageChange : onPageChange;
    const finalPageSizeHandler = useUrlPagination ? handleUrlPageSizeChange : setPageSize;

    const table = useReactTable({
        data: hasData ? data : [], // Empty array if no data
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(totalRows / pageSize),
        manualSorting: true,
        state: {
            pagination: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                totalRows: totalRows
            },
            sorting: {
                sort: []
            }
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
                const newState = updater(table.getState().pagination);
                if (newState.pageIndex !== pageIndex && finalPageChangeHandler) {
                    startTransition(() => {
                        finalPageChangeHandler(newState.pageIndex);
                    });
                }
            }
        },
    })

    if (error) return (
        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 text-center">   
            <div className="text-red-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-red-900 mb-2">Hata Oluştu</h3>
            <p className="text-red-600">{error.message}</p>
        </div>
    );

    if (isEmpty) return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Veri bulunamadı</h3>
            <p className="text-gray-600">Bu sayfada gösterilecek kayıt yok.</p>
        </div>
    );

    const paginationState = table.getState().pagination;
    const currentPage = paginationState.pageIndex + 1;
    const totalPages = table.getPageCount();
    const totalRowsDisplayed = table.getRowCount();
    
    const canGoPrevious = table.getCanPreviousPage();
    const canGoNext = table.getCanNextPage();

    const handlePreviousPage = () => {
        if (canGoPrevious) {
            startTransition(() => {
                table.previousPage();
            });
        }
    };

    const handleNextPage = () => {
        if (canGoNext) {
            startTransition(() => {
                table.nextPage();
            });
        }
    };

    const handlePageSizeChange = (value) => {
        if (finalPageSizeHandler) {
            startTransition(() => {
                finalPageSizeHandler(Number(value));
            });
        }
    };

    return (
        <div className="relative w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {finalLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                        <Spin size="w-6 h-6" />
                        <span className="text-gray-600 font-medium">Yükleniyor...</span>
                    </div>
                </div>
            )}

            <div className={`w-full ${finalLoading ? 'opacity-40' : 'opacity-100'} transition-opacity duration-300`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-amber-300 to-amber-50 border-b border-gray-200">
                            <tr>
                                {table.getHeaderGroups().map((headerGroup) => 
                                    headerGroup.headers.map((header) => (
                                        <th key={header.id} className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                            {header.isPlaceholder ? null : header.column.columnDef.header}
                                        </th>
                                    ))
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {table.getRowModel().rows.map((row, index) => (
                                <tr key={row.id} className={`hover:bg-amber-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {cell.column.columnDef.cell 
                                                ? cell.column.columnDef.cell({ 
                                                    getValue: () => cell.getValue(),
                                                    row: row,
                                                    cell: cell,
                                                    table: table
                                                })
                                                : cell.getValue()
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handlePreviousPage} 
                                disabled={!canGoPrevious}
                                className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Önceki
                            </button>     
                            <button 
                                onClick={handleNextPage} 
                                disabled={!canGoNext}
                                className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors duration-200"
                            >
                                Sonraki
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-700">Sayfa başına:</label>
                            <div className="relative">
                                <select 
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 cursor-pointer"
                                    onChange={(e) => handlePageSizeChange(e.target.value)}
                                    value={paginationState.pageSize}
                                > 
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="font-medium">
                                Sayfa <span className="text-blue-600">{currentPage}</span> / <span className="text-blue-600">{totalPages}</span>
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>
                                Toplam <span className="font-medium text-gray-900">{totalRows}</span> kayıt
                            </span>
                            <span className="text-gray-400">•</span>
                            <span>
                                Gösterilen <span className="font-medium text-gray-900">{totalRowsDisplayed}</span> kayıt
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}