import { prisma } from "@/lib/prisma";

const JTLListPage = async () => {

  const reports = await prisma.jTLReport.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      <h1 className="text-3xl font-bold mb-6">
        Data Pelaporan JTL
      </h1>

      <div className="grid gap-6">

        {reports.map((report) => (

          <div
            key={report.id}
            className="border rounded-xl p-5 shadow bg-white"
          >

            <h2 className="text-xl font-bold text-blue-600">
              {report.kategori}
            </h2>

            <p className="text-gray-700 mt-2">
              {report.deskripsi}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              Tanggal:
              {" "}
              {new Date(report.tanggal).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>
    </div>
  );
};

export default JTLListPage;