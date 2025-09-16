import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/students", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStudents(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data");
      setLoading(false);
    }
  };

  const fetchUserLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data");
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/student/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStudents(students.filter((student) => student.id !== id));

      alert("Data berhasil dihapus");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus data");
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchUserLogin();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div class="relative overflow-x-auto">
      {user?.role !== "teacher" && (
        <div className="mb-4">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => navigate("/student/add")}
          >
            Add new
          </button>
        </div>
      )}

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              NIS
            </th>
            <th scope="col" class="px-6 py-3">
              Nama Lengkap
            </th>
            <th scope="col" class="px-6 py-3">
              Tanggal Lahir
            </th>
            <th scope="col" class="px-6 py-3">
              Kelas
            </th>
            <th scope="col" class="px-6 py-3">
              Alamat
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            {user?.role !== "teacher" && (
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              key={student.id}
            >
              <td class="px-6 py-4">{student.nis}</td>
              <td class="px-6 py-4">{student.nama_lengkap}</td>
              <td class="px-6 py-4">{student.tanggal_lahir}</td>
              <td class="px-6 py-4">{student.kelas}</td>
              <td class="px-6 py-4">{student.alamat}</td>
              <td class="px-6 py-4">{student.status}</td>

              {user?.role !== "teacher" && (
                <td className="gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(student.id)}
                    class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
