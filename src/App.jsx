import { useState } from "react";

import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import { Home } from "lucide-react";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./context/UserProvider";
import ProfilePage from "./pages/ProfilePage";
import TaskDetails from "./pages/TaskDetails";
import CreateTaskPage from "./pages/CreateTaskPage";
import ContactUsPage from "./pages/ContactUsPage";

function App() {
  // Protected
  function RequireAuth({ children }) {
    const { loggedInUser } = useAuth();

    if (loggedInUser === undefined) {
      return null;
    }

    if (loggedInUser === null) {
      return <Navigate to="/auth/login" replace />;
    }

    return children;
  }

  // home, login ,register
  function RequireUnAuth({ children }) {
    const { loggedInUser } = useAuth();

    if (loggedInUser === undefined) {
      return null;
    }

    if (loggedInUser !== null) {
      return <Navigate to="/task" replace />;
    }

    return children;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path="ContactUs"
            element={
              <RequireAuth>
                <ContactUsPage />
              </RequireAuth>
            }
          />
          <Route
            path="task"
            element={
              <RequireAuth>
                <TaskPage />
              </RequireAuth>
            }
          >
            <Route
              path=":id"
              element={
                <RequireAuth>
                  <TaskDetails />
                </RequireAuth>
              }
            />
            <Route
              path="create"
              element={
                <RequireAuth>
                  <CreateTaskPage />
                </RequireAuth>
              }
            />
          </Route>
        </Route>

        <Route
          path="/auth"
          element={
            <RequireUnAuth>
              <AuthLayout />
            </RequireUnAuth>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
