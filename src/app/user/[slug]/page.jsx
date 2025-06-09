import UserDetail from "@/views/user/detail";
import { get } from "@/logic/request";
import { notFound } from "next/navigation";

export default async function UserPage({ params }) {
    const { slug } = await params;
    
    try {
        const userData = await get(`/users/${slug}`);
        
        return <UserDetail userData={userData} />
    } catch (error) {
        notFound();
    }
}