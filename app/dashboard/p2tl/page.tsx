"use client";

import { useState } from "react";
import { createP2TLReport } from "@/lib/action";
import Link from "next/link";

const P2TLPage = () => {

  // State GPS
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Function ambil lokasi GPS
  const getLocation = () => {

    if (!navigator.geolocation) {
      alert("Browser tidak mendukung GPS");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {

        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());

        setLoadingLocation(false);
      },

      (error) => {
        console.log(error);
        alert("Gagal mengambil lokasi");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-600">
          Pelaporan P2TL
        </h1>

        <p className="text-gray-600 mt-2">
          Silakan isi form laporan P2TL di bawah ini.
        </p>
      </div>

      {/* Form */}
      <form
        action={createP2TLReport}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border"
      >

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

        {/* GPS Lokasi */}
        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold text-gray-900">
              Lokasi GPS
            </h2>

            <button
              type="button"
              onClick={getLocation}
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              {loadingLocation ? "Mengambil..." : "Ambil Lokasi"}
            </button>

          </div>

          {/* Latitude */}
          <div>
            <label
              htmlFor="latitude"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Latitude
            </label>

            <input
              type="text"
              id="latitude"
              name="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="-6.200000"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900"
            />
          </div>

          {/* Longitude */}
          <div>
            <label
              htmlFor="longitude"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Longitude
            </label>

            <input
              type="text"
              id="longitude"
              name="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="106.816666"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900"
            />
          </div>

        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Kirim Laporan
        </button>
      </form>

    </div>
  );
};

export default P2TLPage;