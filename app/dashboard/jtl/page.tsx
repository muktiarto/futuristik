import { createJTLReport } from "@/lib/action";
import Link from "next/link";

const JTLPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Pelaporan JTL
        </h1>
        <p className="text-gray-600 mt-2">
          Silakan isi form laporan JTL di bawah ini.
        </p>
      </div>
            {/* Form */}
            <form action={createJTLReport} className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border">

        {/* Jenis Kategori */}
        <div>
          <label
            htmlFor="kategori"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Jenis Kategori
          </label>

          <select
            id="kategori"
            name="kategori"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="Kabel listrik">Kabel listrik</option>
            <option value="Tiang listrik">Tiang listrik</option>
            <option value="kWh meter">kWh meter</option>
            <option value="Gardu">Gardu</option>
          </select>
        </div>

        {/* Deskripsi */}
        <div>
          <label
            htmlFor="deskripsi"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Deskripsi Laporan
          </label>

          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={5}
            placeholder="Masukkan detail laporan..."
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Upload Foto */}
        <div>
          <label
            htmlFor="foto"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Input Foto
          </label>

          <input
            type="file"
            id="foto"
            name="foto"
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
          />
        </div>

        {/* Pilih Tanggal */}
        <div>
          <label
            htmlFor="tanggal"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Pilih Tanggal
          </label>

          <input
            type="date"
            id="tanggal"
            name="tanggal"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Kirim Laporan
        </button>
      <div className="flex justify-center">
  <Link
    href="/dashboard/jtl/list"
    className="inline-flex justify-center bg-green-600 hover:bg-green-900 text-white px-60 py-2 rounded-lg font-semibold transition"
  >
    Lihat Riwayat Laporan
  </Link>
</div>
      </form>
      
    </div>
    

    
  )
}

export default JTLPage