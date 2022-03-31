import { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CoursePage from "./pages/CoursePage";
import LoginPage from "./pages/LoginPage";
import SectionPage from "./pages/SectionPage";
import StudentPage from "./pages/StudentPage";
import TeacherPage from "./pages/TeacherPage";
import TopicPage from "./pages/TopicPage";
import TutorPage from "./pages/TutorPage";
import TutorshipPage from "./pages/TutorshipPage";

export const AppRouter = () => {
  const [title, setTitle] = useState("Tutorías");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  return useRoutes([
    {
      path: "/",
      //element: <LoginTheme />,
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        { path: "login", element: <LoginPage /> },
      ],
    },
    {
      path: "/tuto/",
      element: (
        <Layout title={title} snackbar={snackbar} setSnackbar={setSnackbar} />
      ),
      children: [
        {
          path: "course",
          element: <CoursePage setTitle={setTitle} setSnackbar={setSnackbar} />,
        },
        {
          path: "teacher",
          element: (
            <TeacherPage setTitle={setTitle} setSnackbar={setSnackbar} />
          ),
        },
        {
          path: "student",
          element: (
            <StudentPage setTitle={setTitle} setSnackbar={setSnackbar} />
          ),
        },
        {
          path: "section",
          element: (
            <SectionPage setTitle={setTitle} setSnackbar={setSnackbar} />
          ),
        },
        {
          path: "tutor",
          element: <TutorPage setTitle={setTitle} setSnackbar={setSnackbar} />,
        },
        {
          path: "tutorship",
          element: (
            <TutorshipPage setTitle={setTitle} setSnackbar={setSnackbar} />
          ),
        },
        {
          path: "topic",
          element: <TopicPage setTitle={setTitle} setSnackbar={setSnackbar} />,
        },
      ],
    },
  ]);
};
