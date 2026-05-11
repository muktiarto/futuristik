import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center p-4">
      
      {/* Gambar dari folder public */}
      <Image
        src="/Logo-PLN-Futuristik.png"
        alt="Hero Image"
        width={400}
        height={400}
        className="mb-6 rounded-xl shadow-lg"
        priority
      />

      {/* Judul */}
      <h1 className="text-5xl font-bold text-gray-900">
        Find Risk And Opportunity
      </h1>

      {/* Sub text */}
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Analyze opportunities, manage risks, and make smarter decisions with powerful insights.
      </p>

    </div>
  );
}