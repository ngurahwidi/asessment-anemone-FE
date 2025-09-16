import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ScheduleHistory = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/schedules-history",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSchedules(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data");
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/schedule/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/schedules/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSchedules(schedules.filter((schedule) => schedule.id !== id));

      alert("Data berhasil dihapus");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus data");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div class="relative overflow-x-auto">
      <div className="mb-4">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => navigate("/schedule/add")}
        >
          Add new
        </button>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Teacher
            </th>
            <th scope="col" class="px-6 py-3">
              Student
            </th>
            <th scope="col" class="px-6 py-3">
              Day
            </th>
            <th scope="col" class="px-6 py-3">
              Start Hour
            </th>
            <th scope="col" class="px-6 py-3">
              Finish Hour
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              key={schedule.id}
            >
              <td class="px-6 py-4">{schedule.teacher.nama_lengkap}</td>
              <td class="px-6 py-4">{schedule.student.nama_lengkap}</td>
              <td class="px-6 py-4">{schedule.hari_text}</td>
              <td class="px-6 py-4">{schedule.jam_mulai}</td>
              <td class="px-6 py-4">{schedule.jam_selesai}</td>
              <td className="gap-2 p-2">
                <button
                  type="button"
                  onClick={() => handleEdit(schedule.id)}
                  class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(schedule.id)}
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
