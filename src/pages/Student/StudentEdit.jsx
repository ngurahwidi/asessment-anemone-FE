import axios from "axios";
import { Datepicker } from "flowbite";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const StudentEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nis: "",
    nama_lengkap: "",
    tanggal_lahir: "",
    kelas: "",
    status: "aktif",
    alamat: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStudentDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/students/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setForm(response.data.data);
    } catch (err) {
      alert(
        err.response?.data?.message || "Terjadi kesalahan saat mengambil data"
      );
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:8000/api/students/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      alert("Student berhasil ditambahkan!");
      setForm({
        nis: "",
        nama_lengkap: "",
        tanggal_lahir: "",
        kelas: "",
        status: "aktif",
        alamat: "",
      });

      navigate("/student");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Gagal menambahkan student");
    }
  };

  useEffect(() => {
    fetchStudentDetail();
  }, [id]);

  return (
    <div className="flex-1 ">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Student
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="nis"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  NIS
                </label>
                <input
                  type="text"
                  id="nis"
                  name="nis"
                  value={form.nis}
                  onChange={handleChange}
                  placeholder="Masukkan NIS"
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
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="tanggal_lahir"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tanggal Lahir
                </label>

                <input
                  type="date"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  value={form.tanggal_lahir}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="kelas"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kelas
                </label>
                <input
                  type="text"
                  id="kelas"
                  name="kelas"
                  value={form.kelas}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
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
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Tidak Aktif</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="alamat"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Alamat
                </label>
                <textarea
                  id="alamat"
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  placeholder="Masukkan alamat lengkap"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical"
                  required
                />
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
