import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      alert(err.message || "Terjadi kesalahan saat mengambil data");
    }
  };

  const handleLogout = async () => {
    if (!window.confirm("Yakin ingin logout?")) return;

    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Hapus token di localStorage
      localStorage.removeItem("token");

      // Redirect ke login
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal logout");
    }
  };

  useEffect(() => {
    fetchUserLogin();
  }, []);
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {/* Schedule */}
          <li>
            <Link
              to="/schedule"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6 2a1 1 0 1 1 2 0v1h4V2a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v1H3V5a2 2 0 0 1 2-2h1V2ZM3 8h14v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
              </svg>
              <span className="ms-3">Schedule</span>
            </Link>
          </li>

          {/* Teacher */}
          {user?.role !== "teacher" && (
            <li>
              <Link
                to="/teacher"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z" />
                </svg>
                <span className="ms-3">Teacher</span>
              </Link>
            </li>
          )}

          {/* Student */}
          <li>
            <Link
              to="/student"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2 1 7l11 5 9-4.09V17h2V7L12 2Zm-1 18a4 4 0 0 0-4-4H3a4 4 0 0 0-4 4v2h12v-2Zm7-4a4 4 0 0 0-4 4v2h8v-2a4 4 0 0 0-4-4Z" />
              </svg>
              <span className="ms-3">Student</span>
            </Link>
          </li>

          {/* Schedule History */}
          {user?.role !== "teacher" && (
            <li>
              <Link
                to="/schedule-history"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8a1 1 0 0 1 1 1v3.59l2.3 2.3a1 1 0 1 1-1.42 1.42L11 13.41V9a1 1 0 0 1 1-1Zm0-6a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" />
                </svg>
                <span className="ms-3">Schedule History</span>
              </Link>
            </li>
          )}

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-100 dark:hover:bg-red-700 group"
            >
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-red-600 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 13v-2H7V8l-5 4 5 4v-3h9Zm3-9h-6v2h6v14h-6v2h6a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
              </svg>
              <span className="ms-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};
