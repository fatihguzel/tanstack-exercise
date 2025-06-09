export default function InfoCard({ data }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-300 to-amber-500 p-6 text-white">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                            src={data?.image} 
                            alt={`${data.firstName} ${data.lastName}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">
                            {data.firstName} {data.lastName}
                            {data.maidenName && <span className="text-blue-200 text-lg"> (née {data.maidenName})</span>}
                        </h1>
                        <p className="text-blue-200">@{data.username}</p>
                        <div className="flex items-center space-x-4 mt-2">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                {data.age} years old
                            </span>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize">
                                {data.gender}
                            </span>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                {data.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-2">
                        Contact Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 text-gray-500">📧</span>
                            <span className="text-gray-700">{data.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 text-gray-500">📱</span>
                            <span className="text-gray-700">{data.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 text-gray-500">🎂</span>
                            <span className="text-gray-700">{data.birthDate}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-green-500 pb-2">
                        Physical Info
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Height</p>
                            <p className="font-semibold">{data.height} cm</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Weight</p>
                            <p className="font-semibold">{data.weight} kg</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Eye Color</p>
                            <p className="font-semibold">{data.eyeColor}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Blood Group</p>
                            <p className="font-semibold">{data.bloodGroup}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                            <p className="text-sm text-gray-500">Hair</p>
                            <p className="font-semibold">{data.hair.color} • {data.hair.type}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-500 pb-2">
                        Address
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold">{data.address.address}</p>
                        <p className="text-gray-600">
                            {data.address.city}, {data.address.state} {data.address.postalCode}
                        </p>
                        <p className="text-gray-600">{data.address.country}</p>
                        <div className="mt-2 text-sm text-gray-500">
                            <span>📍 {data.address.coordinates.lat}, {data.address.coordinates.lng}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-purple-500 pb-2">
                        Professional
                    </h2>
                    <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg">{data.company.title}</h3>
                            <p className="text-gray-600">{data.company.name}</p>
                            <p className="text-sm text-gray-500">{data.company.department} Department</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Education</p>
                            <p className="font-semibold">{data.university}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-yellow-500 pb-2">
                        Banking & Security
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Card Type</p>
                            <p className="font-semibold">{data.bank.cardType}</p>
                            <p className="text-xs text-gray-400">Expires: {data.bank.cardExpire}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Currency</p>
                            <p className="font-semibold">{data.bank.currency}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Crypto</p>
                            <p className="font-semibold">{data.crypto.coin}</p>
                            <p className="text-xs text-gray-400">{data.crypto.network}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-500 pb-2">
                        Technical Info
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">IP Address</p>
                            <p className="font-mono text-sm">{data.ip}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">MAC Address</p>
                            <p className="font-mono text-sm">{data.macAddress}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">EIN</p>
                            <p className="font-mono text-sm">{data.ein}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">SSN</p>
                            <p className="font-mono text-sm">{data.ssn}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}