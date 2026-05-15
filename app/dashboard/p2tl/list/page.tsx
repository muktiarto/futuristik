import { prisma } from "@/lib/prisma";
import { deleteP2TLReport } from "@/lib/action";
import { updateP2TLStatus } from "@/lib/action";
import { auth } from "@/auth";
import { P2TLReport,User } from "@prisma/client";
import { redirect } from "next/navigation";


const P2TLListPage = async () => {
const session = await auth();
if (session?.user?.role === "PELAKSANA") {
    redirect("/dashboard/jtl/list");
}

const reports: (P2TLReport & { user: User })[]= await prisma.p2TLReport.findMany({

  where:
    session?.user?.role === "ADMIN"
      ? {}
      : {
          userId: session?.user?.id,
        },

  include: {
    user: true,
  },

  orderBy: {
    createdAt: "desc",
  },

});

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-6 text-green-600">
        Data Pelaporan P2TL
      </h1>

      <div className="grid gap-6">

        {reports.map((report) => (

<div
    key={report.id}
    className="border rounded-xl p-5 shadow bg-white"
  >

    <div className="flex items-center justify-between">

<p className="font-bold text-black mt-2">
  Dilaporkan oleh :
  <span className="font-semibold ml-1">
    {report.user.name}
  </span>
</p>

<p className="text-gray-700 mt-3">
  {report.deskripsi}
</p>

      {/* STATUS */}
      <div>
        {report.status === "Menunggu" && (
          <span className="bg-gray-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Menunggu
          </span>
        )}

        {report.status === "Valid" && (
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Valid
          </span>
        )}

        {report.status === "Tidak Valid" && (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Tidak Valid
          </span>
        )}

        {report.status === "Hoax" && (
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
            Hoax
          </span>
        )}
      </div>
     {/* UPDATE STATUS ADMIN */}
{session?.user?.role === "ADMIN" && (
  <div className="mt-4">

    <form
      action={async (formData) => {
        "use server";

        const status = formData.get("status") as string;

        await updateP2TLStatus(report.id, status);
      }}
    >

      <select
        name="status"
        defaultValue={report.status}
        className="border rounded-lg px-3 py-2"
      >
        <option value="Menunggu">
          Menunggu
        </option>

        <option value="Valid">
          Valid
        </option>

        <option value="Tidak Valid">
          Tidak Valid
        </option>

        <option value="Hoax">
          Hoax
        </option>
      </select>

      <button
        type="submit"
        className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Update Status
      </button>

    </form>

  </div>
)}

    </div>

    <p className="text-sm text-gray-500 mt-4">
      Tanggal:
      {" "}
      {new Date(report.tanggal).toLocaleDateString()}
    </p>

    <p className="text-sm text-gray-500 mt-2">
      Latitude: {report.latitude}
    </p>

    <p className="text-sm text-gray-500">
      Longitude: {report.longitude}
    </p>

    {/* GOOGLE MAPS */}
    <div className="mt-3">
      <a
        href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
        target="_blank"
        className="text-blue-600 underline"
      >
        Lihat Lokasi
      </a>
    </div>

    {/* DELETE */}
    <div className="mt-5">
      <form
        action={async () => {
          "use server";
          await deleteP2TLReport(report.id);
        }}
      >
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Hapus Laporan
        </button>
      </form>
    </div>

  </div>

        ))}

      </div>
    </div>
  );
};

export default P2TLListPage;