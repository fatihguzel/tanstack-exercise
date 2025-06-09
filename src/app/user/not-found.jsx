export default function NotFound({ title, description }) {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-2xl font-bold">404</h1>
            <span className="text-gray-600 font-medium">{title}</span>
            <span className="text-gray-500 font-medium">{description}</span>
        </div>
    )
}