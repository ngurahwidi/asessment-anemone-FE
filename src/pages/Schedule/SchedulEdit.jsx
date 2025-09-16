import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ScheduleEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    teacher_id: "",
    student_id: "",
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchScheduleDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/schedules/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setForm(response.data.data);
    } catch (err) {
      alert(
        err.response?.data?.message || "GTerjadi kesalahan saat mengambil data"
      );
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/active-students",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudents(response.data.data);
      setLoading(false);
    } catch (err) {
      alert(err.message || "Terjadi kesalahan saat mengambil data");
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/active-teachers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTeachers(response.data.data);
      setLoading(false);
    } catch (err) {
      alert(err.message || "Terjadi kesalahan saat mengambil data");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`http://localhost:8000/api/schedules/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      alert("Schedule berhasil ditambahkan!");
      setForm({
        teacher_id: "",
        student_id: "",
        hari: "",
        jam_mulai: "",
        jam_selesai: "",
      });

      navigate("/schedule-history");
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Gagal menambahkan schedule");
    }
  };

  useEffect(() => {
    fetchStudents(), fetchTeachers(), fetchScheduleDetail();
  }, [id]);
  return (
    <div className="flex-1 ">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Tambah Schedule
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="teacher_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Teacher
                </label>
                <select
                  id="teacher_id"
                  name="teacher_id"
                  value={form.teacher_id}
                  onChange={handleChange}
                  className="bg-gray-50 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="">Pilih Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.nama_lengkap} - {teacher.mata_pelajaran}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="student_id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Student
                </label>
                <select
                  id="student_id"
                  name="student_id"
                  value={form.student_id}
                  onChange={handleChange}
                  className="bg-gray-50 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all "
                  required
                >
                  <option value="">Pilih Student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.nama_lengkap} - {student.kelas}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="hari"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Hari
                </label>
                <select
                  id="hari"
                  name="hari"
                  value={form.hari}
                  onChange={handleChange}
                  className="bg-gray-50 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all "
                  required
                >
                  <option value="">Pilih Hari</option>
                  <option value="1">Senin</option>
                  <option value="2">Selasa</option>
                  <option value="3">Rabu</option>
                  <option value="4">Kamis</option>
                  <option value="5">Jumat</option>
                  <option value="6">Sabtu</option>
                  <option value="7">Minggu</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="jam_mulai"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jam Mulai
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="time"
                    id="jam_mulai"
                    name="jam_mulai"
                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={form.jam_mulai}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="jam_selesai"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Jam Mulai
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="time"
                    id="jam_selesai"
                    name="jam_selesai"
                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={form.jam_selesai}
                    onChange={handleChange}
                    required
                  />
                </div>
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
