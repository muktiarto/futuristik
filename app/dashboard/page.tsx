import { auth } from "@/auth"
import Link from "next/link"

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Dashboard
        </h1>

        <h2 className="text-xl text-gray-700 mt-2">
          Welcome back :
          <span className="font-bold ml-2">
            {session?.user?.name}
          </span>
        </h2>
      </div>

      {/* Menu Pilihan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Pelaporan JTL */}
        <Link href="/dashboard/jtl">
          <div className="bg-white border rounded-2xl shadow-md p-8 hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
            <h3 className="text-2xl font-bold text-blue-600 mb-3">
              Pelaporan JTL
            </h3>

            <p className="text-gray-600">
              Kelola dan input laporan JTL dengan cepat dan efisien.
            </p>
          </div>
        </Link>

        {/* Pelaporan P2TL */}
        <Link href="/dashboard/p2tl">
          <div className="bg-white border rounded-2xl shadow-md p-8 hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              Pelaporan P2TL
            </h3>

            <p className="text-gray-600">
              Monitoring dan pelaporan hasil pemeriksaan P2TL.
            </p>
          </div>
        </Link>

        {/* Pelaporan Potensi Pertambahan Energi */}
        <Link href="/dashboard/energi">
          <div className="bg-white border rounded-2xl shadow-md p-8 hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              Pelaporan Potensi Pertambahan Energi
            </h3>

            <p className="text-gray-600">
              Analisis dan laporan potensi pertambahan energi pelanggan.
            </p>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Dashboard