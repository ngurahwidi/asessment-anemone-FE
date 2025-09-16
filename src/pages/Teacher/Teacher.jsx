import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch API
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/teachers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTeachers(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data");
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/teacher/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTeachers(teachers.filter((teacher) => teacher.id !== id));

      alert("Data berhasil dihapus");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus data");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div class="relative overflow-x-auto">
      <div className="mb-4">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => navigate("/teacher/add")}
        >
          Add new
        </button>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              NIP
            </th>
            <th scope="col" class="px-6 py-3">
              Nama Lengkap
            </th>
            <th scope="col" class="px-6 py-3">
              Mata Pelajaran
            </th>
            <th scope="col" class="px-6 py-3">
              Nomor Telepon
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              key={teacher.id}
            >
              <td class="px-6 py-4">{teacher.nip}</td>
              <td class="px-6 py-4">{teacher.nama_lengkap}</td>
              <td class="px-6 py-4">{teacher.mata_pelajaran}</td>
              <td class="px-6 py-4">{teacher.nomor_telepon}</td>
              <td class="px-6 py-4">{teacher.status}</td>
              <td className="gap-2 p-2">
                <button
                  type="button"
                  onClick={() => handleEdit(teacher.id)}
                  class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(teacher.id)}
                  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
