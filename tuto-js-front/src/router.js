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
      element: <Layout title={title} />,
      children: [
        { path: "course", element: <CoursePage setTitle={setTitle} /> },
        { path: "teacher", element: <TeacherPage setTitle={setTitle} /> },
        { path: "student", element: <StudentPage setTitle={setTitle} /> },
        { path: "section", element: <SectionPage setTitle={setTitle} /> },
        { path: "tutor", element: <TutorPage setTitle={setTitle} /> },
        { path: "tutorship", element: <TutorshipPage setTitle={setTitle} /> },
        { path: "topic", element: <TopicPage setTitle={setTitle} /> },
      ],
    },
  ]);
};
