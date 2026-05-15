import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const ReportPage = async () => {

  const session = await auth();

  // JTL
  const jtlReports = await prisma.jTLReport.findMany({
    where:
      session?.user?.role === "ADMIN"
        ? {}
        : {
            userId: session?.user?.id,
          },

    include: {
      user: true,
    },
  });

  // P2TL
  const p2tlReports = await prisma.p2TLReport.findMany({
    where:
      session?.user?.role === "ADMIN"
        ? {}
        : {
            userId: session?.user?.id,
          },

    include: {
      user: true,
    },
  });

  // ENERGI
  const energiReports = await prisma.energiReport.findMany({
    where:
      session?.user?.role === "ADMIN"
        ? {}
        : {
            userId: session?.user?.id,
          },

    include: {
      user: true,
    },
  });


  // gabungkan
  const reports = [
    ...jtlReports.map((item) => ({
      ...item,
      type: "JTL",
    })),

    ...p2tlReports.map((item) => ({
      ...item,
        type: "P2TL",
        kategori: "P2TL",
    })),

        ...energiReports.map((item) => ({
      ...item,
        type: "ENERGI",
        kategori: "ENERGI",
    })),

  ];

  // urutkan terbaru
  reports.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return (
    <div className="max-w-6xl mx-auto py-10">

      <h1 className="text-3xl font-bold mb-6">
        Semua Pelaporan
      </h1>

      <div className="grid gap-5">

        {reports.map((report) => (

          <div
            key={report.id}
            className="border rounded-xl p-5 bg-white shadow"
          >

            {/* TYPE */}
            <div className="flex items-center justify-between mb-2">

              {report.type === "JTL" && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  JTL
                </span>
                
              )}

              {report.type === "P2TL" && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  P2TL
                </span>
              )}

              {report.type === "ENERGI" && (
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  ENERGI
                </span>
              )}

            <p className="mt-2">
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

            </div>

            {/* DATA */}
            <p className="text-xl text-black-400 mt-2">
            Dilaporkan oleh :
            <span className="font-bold ml-1">
                {report.user.name}
            </span>
            </p>
            <h2 className="text-xl font-bold text-blue-600">
            {report.kategori}
            </h2>
            <p className="text-sm text-gray-500 mt-3">
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
          </div>

        ))}

      </div>

    </div>
  );
};

export default ReportPage;