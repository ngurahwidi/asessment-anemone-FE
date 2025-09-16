import { Route, Routes } from "react-router-dom";
import Student from "./pages/Student/Student.jsx";
import { Teacher } from "./pages/Teacher/Teacher.jsx";
import { Login } from "./pages/Login.jsx";
import { Layout } from "./components/Layout.jsx";
import { Schedule } from "./pages/Schedule/Schedule.jsx";
import { ScheduleAdd } from "./pages/Schedule/ScheduleAdd.jsx";
import { TeacherAdd } from "./pages/Teacher/TeacherAdd.jsx";
import { StudentAdd } from "./pages/Student/StudentAdd.jsx";
import { StudentEdit } from "./pages/Student/StudentEdit.jsx";
import { TeacherEdit } from "./pages/Teacher/TeacherEdit.jsx";
import { ScheduleEdit } from "./pages/Schedule/SchedulEdit.jsx";
import { ScheduleHistory } from "./pages/Schedule/ScheduleHistory.jsx";
import { GuestRoute, ProtectedRoute } from "./components/AuthRoute.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Layout>
                <Student />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/add"
          element={
            <ProtectedRoute>
              <Layout>
                <StudentAdd />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <StudentEdit />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute>
              <Layout>
                <Teacher />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/add"
          element={
            <ProtectedRoute>
              <Layout>
                <TeacherAdd />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <TeacherEdit />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Layout>
                <Schedule />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule-history"
          element={
            <ProtectedRoute>
              <Layout>
                <ScheduleHistory />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule/add"
          element={
            <ProtectedRoute>
              <Layout>
                <ScheduleAdd />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ScheduleEdit />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
