import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TeacherAdd = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    nip: "",
    nama_lengkap: "",
    mata_pelajaran: "",
    nomor_telepon: "",
    status: "aktif",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/teachers", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      alert("Teacher berhasil ditambahkan!");
      setForm({
        username: "",
        password: "",
        nip: "",
        nama_lengkap: "",
        mata_pelajaran: "",
        nomor_telepon: "",
        status: "aktif",
      });

      navigate("/teacher");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Gagal menambahkan teacher");
    }
  };
  return (
    <div className="flex-1 ">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tambah Teacher
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="nip"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  NIP
                </label>
                <input
                  type="text"
                  id="nip"
                  name="nip"
                  value={form.nip}
                  onChange={handleChange}
                  placeholder="Masukan NIP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="nama_lengkap"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="nama_lengkap"
                  name="nama_lengkap"
                  value={form.nama_lengkap}
                  onChange={handleChange}
                  placeholder="Masukan nama lengkap"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mata_pelajaran"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mata Pelajaran
                </label>
                <input
                  type="text"
                  id="mata_pelajaran"
                  name="mata_pelajaran"
                  value={form.mata_pelajaran}
                  onChange={handleChange}
                  placeholder="Masukan mata pelajaran"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="nomor_telepon"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  id="nomor_telepon"
                  name="nomor_telepon"
                  value={form.nomor_telepon}
                  onChange={handleChange}
                  placeholder="Masukan nomor telepon"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                  required
                >
                  <option value="">Pilih Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Tidak Aktif</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
