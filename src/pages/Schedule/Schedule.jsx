import { useEffect, useState } from "react";
import axios from "axios";

export const Schedule = () => {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/schedules", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchedule(res.data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-700">
        Jadwal Belajar
      </h1>

      {Object.keys(schedule).length === 0 && (
        <p className="text-gray-500 text-center">Tidak ada jadwal</p>
      )}

      {Object.entries(schedule).map(([day, teachers]) => (
        <div key={day} className="bg-white shadow-lg rounded-2xl p-4">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            {teachers[0]?.schedules[0]?.hari_text}
          </h2>

          <div className="space-y-6">
            {teachers.map((teacherBlock, idx) => (
              <div key={idx} className="border rounded-xl p-4">
                <h3 className="text-xl font-bold text-gray-600">
                  {teacherBlock.teacher.nama_lengkap}
                </h3>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teacherBlock.schedules.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
                    >
                      <p className="font-semibold">
                        {item.jam_mulai} - {item.jam_selesai}
                      </p>
                      <p className="text-gray-700">
                        {item.student.nama_lengkap}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
