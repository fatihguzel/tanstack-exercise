import Spin from "@/components/Spin";


export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Spin size="w-10 h-10" />
        </div>
    )
}