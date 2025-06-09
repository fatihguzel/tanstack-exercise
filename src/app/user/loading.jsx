import Spin from "@/components/Spin";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <Spin size="w-10 h-10" />
            <span className="text-gray-600 font-medium">Kullanıcılar yükleniyor...</span>
        </div>
    )
}