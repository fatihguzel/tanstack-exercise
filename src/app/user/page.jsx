import { get } from "@/logic/request";
import NotFound from "@/app/user/not-found";
import User from "@/views/user";

export default async function UserPage({ searchParams }) {
    const params = await searchParams;
    const pageIndex = Math.max(0, (parseInt(params?.page) || 1) - 1);
    const pageSize = parseInt(params?.limit) || 10;

    try {
        const userData = await get(`/users`, {}, {
            skip: pageIndex * pageSize,
            limit: pageSize,
        });
        
        return (
            <User 
                userData={userData} 
                initialPageIndex={pageIndex}
                initialPageSize={pageSize}
            />
        );
    } catch (error) {
        return <NotFound title="Kullanıcılar yüklenirken hata oluştu" description="Lütfen daha sonra tekrar deneyiniz." />;
    }
}